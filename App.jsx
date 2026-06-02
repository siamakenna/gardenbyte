import React, { useMemo, useRef, useState } from "react";
import GardenArt from "./components/GardenArt";
import { generateGarden, paletteSets } from "./lib/garden";

const initialForm = {
  name: "Luna",
  mood: "dreamy",
  palette: "surprise",
  season: "spring",
  timeOfDay: "evening",
  intensity: 5,
  layoutSeed: 1,
  variant: "balanced"
};

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
  ]
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [hasStarted, setHasStarted] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const svgRef = useRef(null);
  const generatorRef = useRef(null);
  const garden = useMemo(() => generateGarden(form), [form]);

  function updateForm(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
    setCopyStatus("");
  }

  function regrowLayout() {
    setForm((current) => ({ ...current, layoutSeed: current.layoutSeed + 1 }));
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
    await navigator.clipboard.writeText(value);
    setCopyStatus(message);
  }

  async function downloadPng() {
    const svg = svgRef.current;
    if (!svg) return;
    const clone = svg.cloneNode(true);
    clone.setAttribute("width", "1280");
    clone.setAttribute("height", "920");
    const serialized = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1280;
      canvas.height = 920;
      const context = canvas.getContext("2d");
      context.fillStyle = "#f7efd9";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `gardenbyte-${garden.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.click();
      setCopyStatus("Garden PNG downloaded.");
    };
    image.src = url;
  }

  return (
    <main className="app-shell">
      <section className="hero-band" id="top">
        <div className="hero-copy">
          <p className="eyebrow">GardenByte</p>
          <h1>Grow a tiny garden from your name.</h1>
          <p>
            A cozy dual-screen-inspired web toy that turns name meaning, sound, origin, and mood into a watercolor garden
            ready to download or add to a profile.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={startGarden}>
              Start Garden
            </button>
            <a className="text-link" href="#about">
              Meaning note
            </a>
          </div>
        </div>
        <div className="title-device" aria-label="GardenByte preview">
          <div className="mini-screen top-mini">
            <span>Symbol map loaded</span>
            <strong>{garden.gardenTitle}</strong>
          </div>
          <div className="mini-screen art-mini">
            <GardenArt garden={garden} />
          </div>
        </div>
      </section>

      <section className={`generator-band ${hasStarted ? "is-active" : ""}`} id="generator" ref={generatorRef}>
        <div className="device-frame">
          <section className="screen top-screen" aria-labelledby="result-heading">
            <div>
              <p className="screen-label">Top Screen</p>
              <h2 id="result-heading">{garden.gardenTitle}</h2>
              <p className="description">{garden.poeticDescription}</p>
            </div>
            <div className="meaning-grid">
              <InfoBlock label="Origin" value={garden.record.origins.join(", ")} />
              <InfoBlock label="Meaning" value={garden.record.meanings.join(", ")} />
              <InfoBlock label="Tone" value={garden.record.gardenTone} />
              <InfoBlock label="Setting" value={garden.weather} />
            </div>
          </section>

          <section className="screen bottom-screen" aria-label="Garden generator controls and preview">
            <div className="garden-panel">
              <GardenArt garden={garden} ref={svgRef} />
            </div>
            <form className="controls-panel" onSubmit={(event) => event.preventDefault()}>
              <label className="field">
                <span>First name</span>
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Enter a name"
                  autoComplete="given-name"
                />
              </label>

              <Picker label="Mood" value={form.mood} options={optionSets.mood} onChange={(value) => updateForm("mood", value)} />
              <Picker label="Palette" value={form.palette} options={optionSets.palette} onChange={(value) => updateForm("palette", value)} />
              <Picker label="Season" value={form.season} options={optionSets.season} onChange={(value) => updateForm("season", value)} />
              <Picker label="Time" value={form.timeOfDay} options={optionSets.timeOfDay} onChange={(value) => updateForm("timeOfDay", value)} />

              <label className="field">
                <span>Garden intensity</span>
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
                <button type="button" onClick={regrowLayout}>
                  Regrow Layout
                </button>
                <button type="button" onClick={cyclePalette}>
                  Change Palette
                </button>
                <button type="button" onClick={() => updateForm("variant", "magical")}>
                  More Magical
                </button>
                <button type="button" onClick={() => updateForm("variant", "earthy")}>
                  More Earthy
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>

      <section className="details-band">
        <article className="detail-section">
          <p className="eyebrow">Why this garden grew this way</p>
          <h2>Every object has a symbolic job.</h2>
          {garden.fallback && <p className="notice">{garden.record.historicalContext}</p>}
          <div className="symbol-list">
            {Object.entries(garden.elements).map(([key, value]) => (
              <div className="symbol-card" key={key}>
                <span>{labelFromKey(key)}</span>
                <strong>{value}</strong>
              </div>
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
          <h2>Save the garden for social posts or a profile README.</h2>
          <div className="button-row">
            <button className="primary-button" type="button" onClick={downloadPng}>
              Download PNG
            </button>
            <button type="button" onClick={() => copyText(garden.caption, "Caption copied.")}>
              Copy Caption
            </button>
            <button type="button" onClick={() => copyText(garden.markdown, "GitHub markdown copied.")}>
              Copy GitHub Markdown
            </button>
          </div>
          {copyStatus && <p className="copy-status">{copyStatus}</p>}
          <div className="markdown-box">
            <span>README snippet</span>
            <code>{garden.markdown}</code>
          </div>
        </article>

        <article className="detail-section" id="about">
          <p className="eyebrow">About the meanings</p>
          <h2>A starter dataset with room to grow.</h2>
          <p>
            GardenByte uses a local starter dataset of more than 30 names, then maps themes like light, peace, strength,
            wisdom, ocean, joy, protection, transformation, mystery, and earth into illustrated garden elements. Name
            meanings can vary across cultures and sources, so this prototype treats them as gentle symbolic inspiration
            rather than a definitive etymology reference.
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

function Picker({ label, value, options, onChange }) {
  return (
    <fieldset className="picker">
      <legend>{label}</legend>
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

function labelFromKey(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}

export default App;
