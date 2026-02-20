const titleEl = document.getElementById("scene-title");
const mapEl = document.getElementById("map");
const statusEl = document.getElementById("status");
const muteBtn = document.getElementById("mute-btn");
const volumeInput = document.getElementById("volume");

let sceneConfig = null;
let currentSceneId = null;
let isMuted = false;
let currentAudios = [];

const fallbackBackgrounds = {
  ciudad:
    "linear-gradient(135deg, rgba(43,72,96,0.95), rgba(56,115,119,0.9) 45%, rgba(95,74,133,0.95))",
  taberna:
    "linear-gradient(135deg, rgba(113,72,38,0.95), rgba(66,40,26,0.95) 50%, rgba(35,22,18,0.95))",
  forja:
    "linear-gradient(135deg, rgba(72,72,83,0.95), rgba(120,63,34,0.95) 45%, rgba(34,22,18,0.95))"
};

const audioFallback = {
  ciudad: [
    { type: "pink", gain: 0.02 },
    { type: "sine", frequency: 120, gain: 0.002 }
  ],
  taberna: [
    { type: "pink", gain: 0.015 },
    { type: "sine", frequency: 180, gain: 0.0018 }
  ],
  forja: [
    { type: "sawtooth", frequency: 90, gain: 0.003 },
    { type: "pink", gain: 0.02 }
  ]
};

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const fallbackNodes = [];

function setStatus(text) {
  statusEl.textContent = text;
}

async function loadConfig() {
  const response = await fetch("./a.json");
  if (!response.ok) {
    throw new Error("No se pudo cargar a.json");
  }
  return response.json();
}

function clearHotspots() {
  mapEl.querySelectorAll(".hotspot").forEach((node) => node.remove());
}

function applyBackground(sceneId, scene) {
  const imageUrl = scene.bg ? `url('${scene.bg}')` : "";
  const fallback = fallbackBackgrounds[sceneId] || fallbackBackgrounds.ciudad;
  mapEl.style.backgroundImage = imageUrl ? `${imageUrl}, ${fallback}` : fallback;
}

function createHotspotButton(hotspot) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "hotspot";
  button.textContent = hotspot.label;
  button.style.left = `${hotspot.x}%`;
  button.style.top = `${hotspot.y}%`;
  button.style.width = `${hotspot.w}%`;
  button.style.height = `${hotspot.h}%`;
  button.title = hotspot.label;

  button.addEventListener("click", () => {
    if (!sceneConfig.scenes[hotspot.go]) {
      setStatus(`El destino '${hotspot.go}' no existe en a.json`);
      return;
    }
    renderScene(hotspot.go);
  });

  return button;
}

function stopCurrentAudio() {
  currentAudios.forEach((audio) => {
    audio.pause();
    audio.src = "";
  });
  currentAudios = [];

  fallbackNodes.forEach(({ source, gainNode }) => {
    source.stop();
    source.disconnect();
    gainNode.disconnect();
  });
  fallbackNodes.length = 0;
}

function createPinkNoiseBuffer() {
  const bufferSize = audioContext.sampleRate * 2;
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  for (let index = 0; index < bufferSize; index += 1) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99765 * b0 + white * 0.099046;
    b1 = 0.96300 * b1 + white * 0.2965164;
    b2 = 0.57000 * b2 + white * 1.0526913;
    data[index] = b0 + b1 + b2 + white * 0.1848;
    data[index] *= 0.05;
  }
  return buffer;
}

function playFallbackAmbience(sceneId) {
  const recipes = audioFallback[sceneId];
  if (!recipes) {
    return;
  }

  recipes.forEach((recipe) => {
    const gainNode = audioContext.createGain();
    gainNode.gain.value = isMuted ? 0 : Number(volumeInput.value) * recipe.gain;
    gainNode.connect(audioContext.destination);

    let source;
    if (recipe.type === "pink") {
      source = audioContext.createBufferSource();
      source.buffer = createPinkNoiseBuffer();
      source.loop = true;
    } else {
      source = audioContext.createOscillator();
      source.type = recipe.type;
      source.frequency.value = recipe.frequency;
    }

    source.connect(gainNode);
    source.start();
    fallbackNodes.push({ source, gainNode, baseGain: recipe.gain });
  });
}

function syncVolumes() {
  const baseVolume = isMuted ? 0 : Number(volumeInput.value);
  currentAudios.forEach((audio) => {
    audio.volume = baseVolume;
  });
  fallbackNodes.forEach(({ gainNode, baseGain }) => {
    gainNode.gain.value = baseVolume * baseGain;
  });
}

async function playSceneAudio(sceneId, scene) {
  stopCurrentAudio();

  const ambienceTracks = Array.isArray(scene.ambience) ? scene.ambience : [];
  if (ambienceTracks.length === 0) {
    playFallbackAmbience(sceneId);
    return;
  }

  const playable = [];
  for (const src of ambienceTracks) {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    playable.push(audio);
  }

  currentAudios = playable;

  try {
    await Promise.all(
      currentAudios.map(async (audio) => {
        audio.volume = isMuted ? 0 : Number(volumeInput.value);
        await audio.play();
      })
    );
  } catch {
    playFallbackAmbience(sceneId);
    setStatus("No se pudieron reproducir algunos audios. Usando sonido base generado.");
  }
}

async function renderScene(sceneId) {
  const scene = sceneConfig.scenes[sceneId];
  currentSceneId = sceneId;
  titleEl.textContent = `Mapa de Rol · ${scene.name}`;
  setStatus(`Estás en ${scene.name}`);

  clearHotspots();
  applyBackground(sceneId, scene);
  (scene.hotspots || []).forEach((hotspot) => {
    mapEl.appendChild(createHotspotButton(hotspot));
  });

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
  await playSceneAudio(sceneId, scene);
}

function bindEvents() {
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.setAttribute("aria-pressed", String(isMuted));
    muteBtn.textContent = isMuted ? "🔇 Silenciado" : "🔊 Sonido";
    syncVolumes();
  });

  volumeInput.addEventListener("input", () => {
    syncVolumes();
  });

  window.addEventListener("beforeunload", () => {
    stopCurrentAudio();
  });
}

async function start() {
  bindEvents();
  try {
    sceneConfig = await loadConfig();
    const initialScene = Object.keys(sceneConfig.scenes || {})[0];
    if (!initialScene) {
      throw new Error("No hay escenas configuradas");
    }
    await renderScene(initialScene);
  } catch (error) {
    setStatus(`Error: ${error.message}. Levantá la app con un servidor local.`);
  }
}

start();