import React, { useEffect, useMemo, useRef, useState } from "react";
import GardenArt from "./components/GardenArt";
import { generateGarden, paletteSets } from "./lib/garden";

const initialForm = {
  name: "Luna",
  mood: "dreamy",
  palette: "pulp",
  season: "spring",
  timeOfDay: "evening",
  scene: "name-led",
  intensity: 5,
  layoutSeed: 1,
  variant: "lush",
  personalMode: false,
  personalWords: "",
  personalMemory: "",
  keepsake: ""
};

const journalKey = "gardenbyte-journal-v2";
const unlockKey = "gardenbyte-unlocks-v2";

const achievementCatalog = [
  ["first-bloom", "First Bloom", "Grow your first garden."],
  ["moon-gardener", "Moon Gardener", "Choose a night or nocturne garden."],
  ["archivist", "Archivist", "Copy notes, alt text, markdown, or a seed."],
  ["botanist", "Botanist", "Save five garden journal entries."],
  ["crystal-keeper", "Crystal Keeper", "Discover five hidden symbols."],
  ["personal-myth", "Personal Myth", "Use Personal Meaning Mode."]
];

function readStoredJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "") || fallback;
  } catch {
    return fallback;
  }
}

function formFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const seed = params.get("seed");
    if (!seed) return initialForm;
    return { ...initialForm, ...JSON.parse(decodeURIComponent(atob(seed))) };
  } catch {
    return initialForm;
  }
}

const defaultLocks = {
  mood: false,
  palette: false,
  scene: false,
  season: false,
  timeOfDay: false,
  intensity: false,
  variant: false
};

const defaultLayerVisibility = {
  terrain: true,
  water: true,
  paths: true,
  structures: true,
  blooms: true,
  details: true,
  signature: true,
  canopy: true
};

const layerOptions = [
  ["terrain", "Terrain"],
  ["water", "Water"],
  ["paths", "Paths"],
  ["structures", "Structures"],
  ["blooms", "Blooms"],
  ["details", "Brushwork"],
  ["signature", "Name Magic"],
  ["canopy", "Canopy"]
];

const variantOptions = [
  ["magical", "Luminous"],
  ["lush", "Verdant"],
  ["earthy", "Mossy"],
  ["balanced", "Balanced"]
];

const optionSets = {
  mood: [
    ["gentle", "Gentle"],
    ["brave", "Brave"],
    ["dreamy", "Dreamy"],
    ["bright", "Bright"],
    ["grounded", "Grounded"]
  ],
  palette: [
    ["surprise", "Name-led"],
    ["pulp", "Pulp Pixel"],
    ["watercolor", "Watercolor"],
    ["botanical", "Botanical Ink"],
    ["nocturne", "Nocturne"],
    ["coastal", "Coastal"],
    ["glade", "Glade"],
    ["greenhouse", "Greenhouse"],
    ["petalpond", "Petal Pond"],
    ["storybook", "Storybook"],
    ["sage", "Sage"],
    ["rose", "Rose"],
    ["tide", "Tide"],
    ["moon", "Moon"],
    ["dawn", "Dawn"],
    ["woodland", "Woodland"]
  ],
  season: [
    ["spring", "Spring"],
    ["summer", "Summer"],
    ["autumn", "Autumn"],
    ["winter", "Winter"]
  ],
  timeOfDay: [
    ["morning", "Morning"],
    ["afternoon", "Afternoon"],
    ["evening", "Evening"],
    ["night", "Night"]
  ],
  scene: [
    ["name-led", "Name-led"],
    ["cottage", "Cottage Garden"],
    ["koi", "Koi Pond"],
    ["botanical", "Botanical Panel"],
    ["meadow", "Meadow Pond"],
    ["greenhouse", "Greenhouse"],
    ["mountain", "Mountain Field"],
    ["coastal", "Coastal Bloom"],
    ["nocturne", "Nocturne Florals"],
    ["blossom", "Blossom Garden"]
  ]
};

const sceneNotes = {
  "name-led": "name meaning chooses a distinct setting",
  cottage: "soft cottage, curved path, garden borders",
  koi: "dark water, lily pads, koi movement",
  botanical: "ornamental panel, fine stems, pressed blooms",
  meadow: "wide meadow, pond, wildflower islands",
  greenhouse: "glasshouse light, potted leaves, warm interior",
  mountain: "distant peaks, alpine flowers, open sky",
  coastal: "sea haze, cliff meadow, wind-brushed flowers",
  nocturne: "moonlit blossoms, deep foliage, violet shadow",
  blossom: "arched bridge, blossom canopy, quiet water"
};

const exportPresets = [
  {
    key: "profile",
    label: "Square Profile",
    detail: "1080 x 1080",
    width: 1080,
    height: 1080,
    description: "Great for avatars and social thumbnails."
  },
  {
    key: "phone",
    label: "Phone Wallpaper",
    detail: "1080 x 1920",
    width: 1080,
    height: 1920,
    description: "Tall crop for lock screens."
  },
  {
    key: "desktop",
    label: "Desktop Wallpaper",
    detail: "1920 x 1080",
    width: 1920,
    height: 1080,
    description: "Wide landscape for laptops."
  },
  {
    key: "readme",
    label: "README Banner",
    detail: "1600 x 600",
    width: 1600,
    height: 600,
    description: "A wide header for GitHub profiles."
  }
];

function App() {
  const [form, setForm] = useState(() => formFromUrl());
  const [hasStarted, setHasStarted] = useState(false);
  const [studioMode, setStudioMode] = useState("guided");
  const [locks, setLocks] = useState(defaultLocks);
  const [visibleLayers, setVisibleLayers] = useState(defaultLayerVisibility);
  const [copyStatus, setCopyStatus] = useState("");
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [journal, setJournal] = useState(() => readStoredJson(journalKey, []));
  const [discoveredSymbols, setDiscoveredSymbols] = useState(() => readStoredJson(unlockKey, []));
  const [audioOn, setAudioOn] = useState(false);
  const svgRef = useRef(null);
  const generatorRef = useRef(null);
  const garden = useMemo(() => generateGarden(form), [form]);
  const shareUrl = useMemo(() => {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(garden.shareSeed)));
      return `${window.location.origin}${window.location.pathname}?seed=${encoded}`;
    } catch {
      return "";
    }
  }, [garden.shareSeed]);
  const unlockedAchievements = useMemo(() => {
    const ids = new Set();
    if (journal.length >= 1) ids.add("first-bloom");
    if (form.timeOfDay === "night" || garden.sceneKey === "nocturne" || garden.paletteKey === "nocturne") ids.add("moon-gardener");
    if (copyStatus.toLowerCase().includes("copied")) ids.add("archivist");
    if (journal.length >= 5) ids.add("botanist");
    if (discoveredSymbols.length >= 5) ids.add("crystal-keeper");
    if (form.personalMode) ids.add("personal-myth");
    return ids;
  }, [journal.length, form.timeOfDay, form.personalMode, garden.sceneKey, garden.paletteKey, copyStatus, discoveredSymbols.length]);
  const visibleLayerCount = Object.values(visibleLayers).filter(Boolean).length;
  const lockCount = Object.values(locks).filter(Boolean).length;

  useEffect(() => {
    localStorage.setItem(journalKey, JSON.stringify(journal.slice(0, 12)));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem(unlockKey, JSON.stringify(discoveredSymbols));
  }, [discoveredSymbols]);

  function playClick() {
    if (!audioOn) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 520;
      gain.gain.setValueAtTime(0.035, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.08);
    } catch {
      // Audio is optional.
    }
  }

  function updateForm(key, value) {
    playClick();
    setForm((current) => ({ ...current, [key]: value }));
    setSelectedSymbol(null);
    setCopyStatus("");
  }

  function regrowLayout() {
    playClick();
    setForm((current) => ({ ...current, layoutSeed: Number(current.layoutSeed) + 1 }));
  }

  function saveToJournal() {
    playClick();
    const entry = {
      id: `${garden.name}-${Date.now()}`,
      title: garden.gardenTitle,
      name: garden.name,
      meaning: garden.record.meanings.join(", "),
      origin: garden.record.origins.join(", "),
      scene: garden.scene.label,
      flower: garden.elements.primaryFlower,
      crystal: garden.elements.crystal,
      charm: garden.elements.charm,
      mood: form.mood,
      seed: garden.shareSeed,
      description: garden.poeticDescription
    };
    setJournal((current) => [entry, ...current.filter((item) => item.title !== entry.title)].slice(0, 12));
    setCopyStatus("Garden saved to journal.");
  }

  function clearJournal() {
    setJournal([]);
    setCopyStatus("Journal cleared.");
  }

  function selectDiscovery(discovery) {
    playClick();
    setSelectedSymbol(discovery);
    setDiscoveredSymbols((current) => current.includes(discovery.id) ? current : [...current, discovery.id]);
  }

  function toggleLock(key) {
    setLocks((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleLayer(key) {
    setVisibleLayers((current) => ({ ...current, [key]: !current[key] }));
  }

  function regenerateUnlocked() {
    setForm((current) => ({
      ...current,
      mood: locks.mood ? current.mood : pickNext(optionSets.mood, current.mood),
      palette: locks.palette ? current.palette : pickNext(optionSets.palette, current.palette),
      scene: locks.scene ? current.scene : pickNext(optionSets.scene, current.scene),
      season: locks.season ? current.season : pickNext(optionSets.season, current.season),
      timeOfDay: locks.timeOfDay ? current.timeOfDay : pickNext(optionSets.timeOfDay, current.timeOfDay),
      intensity: locks.intensity ? current.intensity : String(2 + Math.floor(Math.random() * 7)),
      variant: locks.variant ? current.variant : pickNext(variantOptions, current.variant),
      layoutSeed: current.layoutSeed + 1
    }));
    setCopyStatus("Unlocked settings regenerated.");
  }

  function startGarden() {
    setHasStarted(true);
    generatorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function cyclePalette() {
    const keys = Object.keys(paletteSets).filter((key) => key !== "custom");
    const currentIndex = keys.indexOf(garden.paletteKey);
    updateForm("palette", keys[(currentIndex + 1) % keys.length]);
  }

  async function copyText(value, message) {
    playClick();
    await navigator.clipboard.writeText(value);
    setCopyStatus(message);
  }

  function downloadSvg() {
    const svg = svgRef.current;
    if (!svg) return;
    playClick();
    const serialized = new XMLSerializer().serializeToString(svg.cloneNode(true));
    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const slug = garden.name.toLowerCase().replace(/\s+/g, "-");
    link.href = url;
    link.download = `gardenbyte-${slug}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setCopyStatus("SVG downloaded.");
  }

  async function downloadPng(preset = exportPresets[0]) {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true);
    clone.setAttribute("width", String(preset.width));
    clone.setAttribute("height", String(preset.height));
    clone.setAttribute("preserveAspectRatio", "xMidYMid slice");
    const serialized = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = preset.width;
      canvas.height = preset.height;
      const context = canvas.getContext("2d");
      context.fillStyle = "#f7efd9";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, preset.width, preset.height);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const slug = garden.name.toLowerCase().replace(/\s+/g, "-");
      link.href = pngUrl;
      link.download = `gardenbyte-${slug}-${preset.key}.png`;
      link.click();
      setCopyStatus(`${preset.label} PNG downloaded.`);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setCopyStatus("Could not export PNG. Please try again.");
    };
    image.src = url;
  }

  return (
    <main className="app-shell">
      <nav className="top-nav" aria-label="GardenByte navigation">
        <a href="#top">GardenByte</a>
        <div>
          <a href="#generator">Create</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <section className="hero-band" id="top">
        <div className="hero-art" aria-hidden="true">
          <GardenArt garden={garden} layers={visibleLayers} />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">GardenByte</p>
          <h1>A name garden you can wander through.</h1>
          <p>
            Turn a first name into a cinematic pixel-garden scene with moody shadows, sharp light, symbolic blooms, and
            a compact studio you can keep reshaping like a tiny adventure game.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={startGarden}>
              Create My Garden
            </button>
            <a className="text-link" href="#about">
              How meanings work
            </a>
          </div>
        </div>
        <div className="hero-card" aria-label="Current GardenByte preview">
          <span>Currently growing</span>
          <strong>{garden.gardenTitle}</strong>
          <p>{garden.poeticDescription}</p>
        </div>
      </section>

      <section className="inspo-strip" aria-label="GardenByte visual inspiration">
        <div>
          <span>Pulp Pixel Mood</span>
          <strong>crisp silhouettes, shadowy garden corners, and saturated story lights</strong>
        </div>
        <div>
          <span>Point-and-Click Flow</span>
          <strong>compact choices, visible state, lockable discoveries, quick rerolls</strong>
        </div>
        <div>
          <span>Garden Mystery</span>
          <strong>name meanings become biomes, motifs, hidden layers, and night-lit blooms</strong>
        </div>
      </section>

      <section className={`generator-band ${hasStarted ? "is-active" : ""}`} id="generator" ref={generatorRef}>
        <div className="device-frame">
          <section className="screen top-screen" aria-labelledby="result-heading">
            <div>
              <p className="screen-label">Garden Notes</p>
              <h2 id="result-heading">{garden.gardenTitle}</h2>
              <p className="description">{garden.poeticDescription}</p>
            </div>
            <div className="meaning-grid">
              <InfoBlock label="Origin" value={garden.record.origins.join(", ")} />
              <InfoBlock label="Meaning" value={garden.record.meanings.join(", ")} />
              <InfoBlock label="Tone" value={garden.record.gardenTone} />
              <InfoBlock label="Setting" value={garden.weather} />
            </div>
            <div className="quest-row" aria-label="Current studio status">
              <span>Biome: {garden.scene.label}</span>
              <span>Motif: {labelFromKey(garden.signature.motif)}</span>
              <span>Layers: {visibleLayerCount}/8</span>
              <span>Locks: {lockCount}</span>
            </div>
          </section>

          <section className="screen bottom-screen" aria-label="Garden generator controls and preview">
            <div className="garden-stage">
              <div className="garden-panel">
                <GardenArt garden={garden} layers={visibleLayers} ref={svgRef} onSymbolSelect={selectDiscovery} />
              </div>
              <div className="stage-hud" aria-label="Garden save slot">
                <span>Save Slot {String(form.layoutSeed).padStart(2, "0")}</span>
                <strong>{garden.scene.label}</strong>
                <small>{labelFromKey(garden.signature.motif)} build</small>
                <small>Click glowing markers to find hidden symbols</small>
              </div>
              {selectedSymbol && (
                <aside className="symbol-popover" aria-live="polite">
                  <span>{selectedSymbol.type}</span>
                  <strong>{selectedSymbol.label}</strong>
                  <p>{selectedSymbol.note}</p>
                </aside>
              )}
            </div>
            <form className="controls-panel" onSubmit={(event) => event.preventDefault()}>
              <div className="controls-heading">
                <p className="screen-label">Garden Studio</p>
                <h3>Shape the scene</h3>
              </div>
              <div className="mode-switch" role="group" aria-label="Studio mode">
                <button
                  type="button"
                  className={studioMode === "guided" ? "is-selected" : ""}
                  onClick={() => setStudioMode("guided")}
                >
                  Guided
                </button>
                <button
                  type="button"
                  className={studioMode === "custom" ? "is-selected" : ""}
                  onClick={() => setStudioMode("custom")}
                >
                  Custom Studio
                </button>
              </div>
              {studioMode === "custom" && (
                <CustomStudio
                  layers={visibleLayers}
                  onToggleLayer={toggleLayer}
                  onResetLayers={() => setVisibleLayers(defaultLayerVisibility)}
                  lockedCount={lockCount}
                  layerOptions={layerOptions}
                />
              )}
              <label className="field">
                <span>First name</span>
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Enter a name"
                  autoComplete="given-name"
                />
              </label>

              <section className="personal-meaning-panel" aria-label="Personal Meaning Mode">
                <button
                  type="button"
                  className={form.personalMode ? "is-selected" : ""}
                  onClick={() => updateForm("personalMode", !form.personalMode)}
                >
                  {form.personalMode ? "Personal Meaning On" : "Use Personal Meaning"}
                </button>
                {form.personalMode && (
                  <div className="personal-fields">
                    <label className="field">
                      <span>Three words</span>
                      <input value={form.personalWords} onChange={(event) => updateForm("personalWords", event.target.value)} placeholder="brave, soft, oceanic" />
                    </label>
                    <label className="field">
                      <span>Memory</span>
                      <input value={form.personalMemory} onChange={(event) => updateForm("personalMemory", event.target.value)} placeholder="childhood, friendship, healing" />
                    </label>
                    <label className="field">
                      <span>Keepsake</span>
                      <input value={form.keepsake} onChange={(event) => updateForm("keepsake", event.target.value)} placeholder="shell, key, ribbon, stone" />
                    </label>
                  </div>
                )}
              </section>

              <Picker
                label="Mood"
                value={form.mood}
                options={optionSets.mood}
                onChange={(value) => updateForm("mood", value)}
                lockable={studioMode === "custom"}
                locked={locks.mood}
                onToggleLock={() => toggleLock("mood")}
              />
              <PalettePicker
                value={form.palette}
                options={optionSets.palette}
                onChange={(value) => updateForm("palette", value)}
                lockable={studioMode === "custom"}
                locked={locks.palette}
                onToggleLock={() => toggleLock("palette")}
              />
              <ScenePicker
                value={form.scene}
                options={optionSets.scene}
                onChange={(value) => updateForm("scene", value)}
                lockable={studioMode === "custom"}
                locked={locks.scene}
                onToggleLock={() => toggleLock("scene")}
              />
              <Picker
                label="Season"
                value={form.season}
                options={optionSets.season}
                onChange={(value) => updateForm("season", value)}
                lockable={studioMode === "custom"}
                locked={locks.season}
                onToggleLock={() => toggleLock("season")}
              />
              <Picker
                label="Time"
                value={form.timeOfDay}
                options={optionSets.timeOfDay}
                onChange={(value) => updateForm("timeOfDay", value)}
                lockable={studioMode === "custom"}
                locked={locks.timeOfDay}
                onToggleLock={() => toggleLock("timeOfDay")}
              />

              <label className="field">
                <span className="field-heading">
                  <span>Garden intensity</span>
                  {studioMode === "custom" && <LockButton locked={locks.intensity} onClick={() => toggleLock("intensity")} />}
                </span>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={form.intensity}
                  onChange={(event) => updateForm("intensity", event.target.value)}
                />
              </label>

              <div className="button-grid">
                <button className="primary-button" type="button" onClick={regrowLayout}>
                  Generate Garden
                </button>
                {studioMode === "custom" && (
                  <button className="primary-button alt-button" type="button" onClick={regenerateUnlocked}>
                    Regenerate Unlocked
                  </button>
                )}
                <button type="button" onClick={regrowLayout}>
                  Regrow Layout
                </button>
                <button type="button" onClick={cyclePalette}>
                  Change Palette
                </button>
                {variantOptions.slice(0, 3).map(([value, label]) => (
                  <button type="button" key={value} disabled={studioMode === "custom" && locks.variant} onClick={() => updateForm("variant", value)}>
                    {label}
                  </button>
                ))}
                {studioMode === "custom" && (
                  <button type="button" onClick={() => toggleLock("variant")}>
                    {locks.variant ? "Style Locked" : "Lock Style"}
                  </button>
                )}
                {studioMode === "custom" && (
                  <button type="button" onClick={() => setLocks(defaultLocks)}>
                    Unlock All
                  </button>
                )}
                <button type="button" onClick={() => setAudioOn((current) => !current)}>
                  {audioOn ? "Sound On" : "Sound Off"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>

      <section className="details-band">
        <article className="detail-section">
          <p className="eyebrow">Why this garden grew this way</p>
          <h2>Every brush mark has a symbolic job.</h2>
          {garden.fallback && <p className="notice">{garden.record.historicalContext}</p>}
          <div className="confidence-panel">
            <InfoBlock label="Source confidence" value={garden.confidenceLabel} />
            <InfoBlock label="Sources" value={garden.record.sources.join(", ")} />
          </div>
          <div className="symbol-list">
            {garden.discoveries.map((item) => (
              <button className="symbol-card interactive-card" type="button" key={item.id} onClick={() => selectDiscovery(item)}>
                <span>{item.type}</span>
                <strong>{item.label}</strong>
                <small>{discoveredSymbols.includes(item.id) ? "Discovered" : "Tap to reveal"}</small>
              </button>
            ))}
          </div>
          <ol className="explanation-list">
            {garden.explanation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className="detail-section share-section">
          <p className="eyebrow">Download and share</p>
          <h2>Export the garden for the places people actually use it.</h2>
          <p>
            Keep the recommended garden layout, then save alternate crops for profiles, wallpapers, and GitHub banners
            without rebuilding the scene.
          </p>
          <div className="export-grid" aria-label="Download garden sizes">
            {exportPresets.map((preset, index) => (
              <button
                className={`export-card ${index === 0 ? "primary-button" : ""}`}
                key={preset.key}
                type="button"
                onClick={() => downloadPng(preset)}
              >
                <span>{preset.label}</span>
                <strong>{preset.detail}</strong>
                <small>{preset.description}</small>
              </button>
            ))}
          </div>
          <div className="button-row">
            <button type="button" onClick={() => copyText(garden.caption, "Caption copied.")}>
              Copy Caption
            </button>
            <button type="button" onClick={() => copyText(garden.etymologyNote, "Name notes copied.")}>
              Copy Name Notes
            </button>
            <button type="button" onClick={() => copyText(garden.markdown, "GitHub markdown copied.")}>
              Copy GitHub Markdown
            </button>
            <button type="button" onClick={() => copyText(garden.altText, "Alt text copied.")}>
              Copy Alt Text
            </button>
            <button type="button" onClick={() => copyText(JSON.stringify(garden.shareSeed, null, 2), "JSON seed copied.")}>
              Copy JSON Seed
            </button>
            <button type="button" onClick={() => copyText(shareUrl, "Share URL copied.")}>
              Copy Share URL
            </button>
            <button type="button" onClick={downloadSvg}>
              Download SVG
            </button>
            <button type="button" onClick={() => copyText(garden.gardenCard, "Garden card text copied.")}>
              Copy Garden Card
            </button>
            <button type="button" onClick={saveToJournal}>
              Save to Journal
            </button>
          </div>
          {copyStatus && <p className="copy-status">{copyStatus}</p>}
          <div className="markdown-box">
            <span>README snippet</span>
            <code>{garden.markdown}</code>
          </div>
        </article>

        <article className="detail-section journal-section">
          <p className="eyebrow">Garden Journal</p>
          <h2>Your saved garden collection.</h2>
          <div className="achievement-grid" aria-label="GardenByte achievements">
            {achievementCatalog.map(([id, label, detail]) => (
              <div className={`achievement-card ${unlockedAchievements.has(id) ? "is-unlocked" : ""}`} key={id}>
                <span>{unlockedAchievements.has(id) ? "Unlocked" : "Locked"}</span>
                <strong>{label}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
          {journal.length ? (
            <div className="journal-grid">
              {journal.map((entry) => (
                <article className="journal-card" key={entry.id}>
                  <span>{entry.origin}</span>
                  <strong>{entry.title}</strong>
                  <p>{entry.meaning}</p>
                  <small>{entry.scene} · {entry.flower} · {entry.crystal} · {entry.charm}</small>
                  <button type="button" onClick={() => setForm({ ...initialForm, ...entry.seed })}>Load Garden</button>
                </article>
              ))}
            </div>
          ) : (
            <p className="notice">No saved gardens yet. Save one after you grow a scene to start the collection book.</p>
          )}
          {journal.length > 0 && <button type="button" onClick={clearJournal}>Clear Journal</button>}
        </article>

        <article className="detail-section" id="about">
          <p className="eyebrow">About the meanings</p>
          <h2>A starter dataset with room to grow.</h2>
          <p>
            GardenByte uses a local starter dataset of names, confidence labels, personal meaning inputs, hidden-symbol
            discoveries, and shareable seeds. It maps themes like light, peace, strength, wisdom, ocean, joy, protection,
            transformation, mystery, and earth into illustrated garden elements. Name meanings can vary across cultures and
            sources, so the app labels whether a result is dataset-based, personal, or interpretive instead of pretending
            every name has one final meaning.
          </p>
        </article>
      </section>
    </main>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="info-block">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function CustomStudio({ layers, onToggleLayer, onResetLayers, lockedCount, layerOptions }) {
  return (
    <section className="custom-studio" aria-label="Custom Studio controls">
      <div className="studio-panel-header">
        <span>Layer Toggles</span>
        <strong>{lockedCount} locked</strong>
      </div>
      <div className="layer-toggle-grid">
        {layerOptions.map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={layers[key] ? "is-selected" : ""}
            onClick={() => onToggleLayer(key)}
            aria-pressed={layers[key]}
          >
            <span>{layers[key] ? "On" : "Off"}</span>
            {label}
          </button>
        ))}
      </div>
      <button className="tiny-command" type="button" onClick={onResetLayers}>
        Restore All Layers
      </button>
    </section>
  );
}

function LockButton({ locked, onClick }) {
  return (
    <button className={`lock-button ${locked ? "is-locked" : ""}`} type="button" onClick={onClick} aria-pressed={locked}>
      {locked ? "Locked" : "Lock"}
    </button>
  );
}

function Picker({ label, value, options, onChange, lockable = false, locked = false, onToggleLock }) {
  return (
    <fieldset className="picker">
      <legend>
        <span>{label}</span>
        {lockable && <LockButton locked={locked} onClick={onToggleLock} />}
      </legend>
      <div>
        {options.map(([optionValue, text]) => (
          <button
            key={optionValue}
            type="button"
            className={value === optionValue ? "is-selected" : ""}
            onClick={() => onChange(optionValue)}
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function PalettePicker({ value, options, onChange, lockable = false, locked = false, onToggleLock }) {
  return (
    <fieldset className="picker palette-picker">
      <legend>
        <span>Palette</span>
        {lockable && <LockButton locked={locked} onClick={onToggleLock} />}
      </legend>
      <div>
        {options.map(([optionValue, text]) => {
          const colors = paletteSets[optionValue] ?? paletteSets.watercolor;
          return (
            <button
              key={optionValue}
              type="button"
              className={value === optionValue ? "is-selected" : ""}
              onClick={() => onChange(optionValue)}
            >
              <span className="swatch-row" aria-hidden="true">
                {colors.slice(0, 5).map((color) => (
                  <span key={color} style={{ background: color }} />
                ))}
              </span>
              {text}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function ScenePicker({ value, options, onChange, lockable = false, locked = false, onToggleLock }) {
  return (
    <fieldset className="picker scene-picker">
      <legend>
        <span>Scene</span>
        {lockable && <LockButton locked={locked} onClick={onToggleLock} />}
      </legend>
      <div>
        {options.map(([optionValue, text]) => (
          <button
            key={optionValue}
            type="button"
            className={`scene-option scene-${optionValue} ${value === optionValue ? "is-selected" : ""}`}
            onClick={() => onChange(optionValue)}
          >
            <span className="scene-thumbnail" aria-hidden="true" />
            <span>
              <strong>{text}</strong>
              <small>{sceneNotes[optionValue]}</small>
            </span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function labelFromKey(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

function pickNext(options, currentValue) {
  const values = options.map(([value]) => value);
  if (values.length <= 1) return currentValue;
  let next = values[Math.floor(Math.random() * values.length)];
  if (next === currentValue) {
    next = values[(values.indexOf(currentValue) + 1) % values.length];
  }
  return next;
}

export default App;
