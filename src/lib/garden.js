import { nameRecords } from "../data/names";

const themeLibrary = {
  light: {
    flowers: ["sunflower", "marigold", "golden poppy"],
    plants: ["lantern flower", "morning glory"],
    rocks: ["golden sandstone", "sun-warmed stone"],
    crystals: ["citrine", "sunstone"],
    features: ["sun patch", "lantern glow"],
    charms: ["tiny lantern charm"],
    palettes: ["sunrise", "meadow"]
  },
  peace: {
    flowers: ["white lily", "chamomile", "lotus"],
    plants: ["soft grass", "olive blossom"],
    rocks: ["smooth river stone", "pale pebble"],
    crystals: ["clear quartz", "aquamarine"],
    features: ["quiet pond", "soft mist"],
    charms: ["ribbon charm"],
    palettes: ["pond", "sage"]
  },
  strength: {
    flowers: ["thistle", "sunflower", "marigold"],
    plants: ["oak leaves", "rosemary"],
    rocks: ["granite", "basalt"],
    crystals: ["hematite", "red jasper"],
    features: ["protective gate", "high path"],
    charms: ["shield charm"],
    palettes: ["woodland", "ember"]
  },
  love: {
    flowers: ["rose", "peony", "dahlia"],
    plants: ["cherry blossom", "sweet pea"],
    rocks: ["heart-shaped stone", "pink granite"],
    crystals: ["rose quartz", "green aventurine"],
    features: ["petal drift", "soft meadow"],
    charms: ["pressed-petal charm"],
    palettes: ["rose", "spring"]
  },
  wisdom: {
    flowers: ["lavender", "sage", "violet"],
    plants: ["hazel branch", "olive branch"],
    rocks: ["mossy stone", "slate"],
    crystals: ["amethyst", "lapis"],
    features: ["herb bed", "shaded moss"],
    charms: ["tiny scroll charm"],
    palettes: ["sage", "violet"]
  },
  ocean: {
    flowers: ["blue iris", "lotus", "water lily"],
    plants: ["reed grass", "sea lavender"],
    rocks: ["sea glass", "river stone"],
    crystals: ["aquamarine", "moonstone"],
    features: ["tide pool", "small pond"],
    charms: ["shell-like clay charm"],
    palettes: ["pond", "tide"]
  },
  joy: {
    flowers: ["daisy", "buttercup", "golden poppy"],
    plants: ["clover", "mint sprig"],
    rocks: ["lucky pebble", "warm river stone"],
    crystals: ["citrine", "clear quartz"],
    features: ["sun patch", "blooming meadow"],
    charms: ["painted bead charm"],
    palettes: ["meadow", "spring"]
  },
  protection: {
    flowers: ["rosemary", "hawthorn", "thistle"],
    plants: ["rowan branch", "oak leaves"],
    rocks: ["granite", "black basalt"],
    crystals: ["black tourmaline", "obsidian"],
    features: ["small stone wall", "protective gate"],
    charms: ["shield charm"],
    palettes: ["woodland", "moss"]
  },
  transformation: {
    flowers: ["morning glory", "dahlia", "moonflower"],
    plants: ["fern curl", "seedling"],
    rocks: ["claystone", "rain stone"],
    crystals: ["labradorite", "selenite"],
    features: ["winding path", "dawn glow"],
    charms: ["seed packet charm"],
    palettes: ["dawn", "violet"]
  },
  mystery: {
    flowers: ["moonflower", "night violet", "water lily"],
    plants: ["silver grass", "fern curl"],
    rocks: ["onyx", "silver pebble"],
    crystals: ["moonstone", "labradorite"],
    features: ["stars", "soft fog"],
    charms: ["star map charm"],
    palettes: ["moon", "violet"]
  },
  earth: {
    flowers: ["sage", "dahlia", "chamomile"],
    plants: ["moss", "fern curl", "root sprig"],
    rocks: ["mossy stone", "claystone"],
    crystals: ["green aventurine", "red jasper"],
    features: ["moss patch", "root arch"],
    charms: ["acorn charm"],
    palettes: ["moss", "woodland"]
  },
  moon: {
    flowers: ["moonflower", "white lily", "night violet"],
    plants: ["silver grass", "soft grass"],
    rocks: ["white river stone", "silver pebble"],
    crystals: ["moonstone", "selenite"],
    features: ["moonlit pond", "stars"],
    charms: ["crescent charm"],
    palettes: ["moon", "pond"]
  }
};

export const paletteSets = {
  storybook: ["#f7efd9", "#9cae8b", "#d9a6a1", "#8fb9b8", "#8a6e54"],
  sage: ["#f5ecd9", "#9fb18f", "#6f875d", "#d8c2ad", "#846b52"],
  rose: ["#f8eddf", "#d8a3a3", "#be7779", "#a7b18b", "#765d4a"],
  tide: ["#eef3e8", "#7eaaa8", "#aac7cf", "#d9bfa5", "#5e7f7f"],
  moon: ["#f6f0dc", "#a8a7bd", "#6f7896", "#d7d1df", "#65706a"],
  dawn: ["#fbefd8", "#e2a89e", "#f0c56f", "#9fb9b8", "#806d56"],
  meadow: ["#f8f0dc", "#b7c989", "#ecd275", "#d7997e", "#7b7650"],
  woodland: ["#f2ead8", "#8e9f73", "#6d7b55", "#a17857", "#5e4b39"],
  moss: ["#f3ebd7", "#7f945f", "#566b42", "#b8a071", "#735c42"],
  violet: ["#f5eddc", "#aba1bf", "#81739d", "#9fb18f", "#755e51"],
  pond: ["#f5efd9", "#8db5b0", "#b5d0ce", "#9cab88", "#6f725c"],
  ember: ["#f7edda", "#b96f58", "#d6a85f", "#87775a", "#5c4a39"],
  spring: ["#fbf0df", "#c9d99c", "#e4aaa3", "#f0cf75", "#7b6b50"],
  custom: ["#f7efd9", "#9cae8b", "#d9a6a1", "#8fb9b8", "#8a6e54"]
};

const moodThemes = {
  gentle: ["peace", "love"],
  brave: ["strength", "protection"],
  dreamy: ["mystery", "moon"],
  bright: ["joy", "light"],
  grounded: ["earth", "wisdom"]
};

const seasonFeatures = {
  spring: ["petal drift", "seedling"],
  summer: ["sun patch", "blooming meadow"],
  autumn: ["fallen leaves", "warm path"],
  winter: ["silver mist", "quiet frost"]
};

const timeFeatures = {
  morning: ["dawn glow", "dew wash"],
  afternoon: ["sun patch", "clear sky"],
  evening: ["lantern glow", "long shadows"],
  night: ["stars", "moonlit pond"]
};

export function generateGarden(input) {
  const name = sanitizeName(input.name);
  const record = findRecord(name);
  const fallback = !record;
  const base = record ?? createFallbackRecord(name, input);
  const themes = normalizeThemes(base.themes, input.mood);
  const seed = hashString(`${name}-${input.mood}-${input.season}-${input.timeOfDay}-${input.palette}-${input.intensity}-${input.layoutSeed}-${input.variant}`);
  const random = seededRandom(seed);
  const primaryTheme = choose(themes, random);
  const secondaryTheme = choose(themes.filter((theme) => theme !== primaryTheme), random) ?? themes[0];
  const sourceA = themeLibrary[primaryTheme] ?? themeLibrary.earth;
  const sourceB = themeLibrary[secondaryTheme] ?? themeLibrary.peace;
  const paletteKey = resolvePalette(input.palette, base, sourceA, random);
  const palette = paletteSets[paletteKey] ?? paletteSets.storybook;
  const magicalBoost = input.variant === "magical" ? 2 : 0;
  const earthyBoost = input.variant === "earthy" ? 2 : 0;

  const elements = {
    primaryFlower: choose(base.flowers, random) ?? choose(sourceA.flowers, random),
    secondaryPlant: choose(base.naturalElements, random)?.includes("branch")
      ? choose(sourceB.plants, random)
      : choose(sourceB.flowers.concat(sourceB.plants), random),
    rock: choose(base.rocks, random) ?? choose(sourceA.rocks, random),
    crystal: choose(base.crystals, random) ?? choose(sourceB.crystals, random),
    feature: choose([...seasonFeatures[input.season], ...timeFeatures[input.timeOfDay], ...base.naturalElements, ...sourceA.features], random),
    charm: choose(base.charms, random) ?? choose(sourceB.charms, random)
  };

  const placements = createPlacements(random, input.intensity, magicalBoost, earthyBoost);
  const tone = base.gardenTone;
  const gardenTitle = `${name}'s ${titleCase(primaryTheme)} Garden`;
  const poeticDescription = `A ${tone} garden with ${elements.primaryFlower}, ${elements.crystal}, and ${elements.feature} arranged from the sound and symbolism of ${name}.`;

  return {
    name,
    fallback,
    record: base,
    themes,
    primaryTheme,
    secondaryTheme,
    paletteKey,
    palette,
    elements,
    placements,
    gardenTitle,
    poeticDescription,
    weather: describeSetting(input.timeOfDay, input.season, input.variant),
    explanation: buildExplanation(base, elements, input, primaryTheme, fallback),
    caption: `GardenByte grew ${gardenTitle}: ${poeticDescription}`,
    markdown: `[![${gardenTitle}](./gardenbyte-${name.toLowerCase()}.png)](https://github.com)  \nMade with GardenByte, a tiny name garden generator.`
  };
}

function sanitizeName(name) {
  const cleaned = (name || "Guest").trim().replace(/[^a-zA-Z '-]/g, "");
  return titleCase(cleaned || "Guest");
}

function findRecord(name) {
  return nameRecords.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
}

function createFallbackRecord(name, input) {
  const first = name[0]?.toLowerCase() ?? "g";
  const lengthTheme = name.length <= 4 ? "joy" : name.length >= 8 ? "wisdom" : "earth";
  const firstTheme = first < "g" ? "light" : first < "n" ? "peace" : first < "t" ? "protection" : "mystery";
  const syllables = estimateSyllables(name);
  const syllableTheme = syllables >= 3 ? "transformation" : "strength";
  return {
    name,
    origins: ["Record pending"],
    meanings: ["symbolic garden generated from name sound and selected preferences"],
    historicalContext: "We do not have a full origin record for this name yet, so GardenByte grew this garden using your selected mood, sound pattern, and symbolic preferences.",
    themes: [firstTheme, lengthTheme, syllableTheme, ...(moodThemes[input.mood] ?? [])],
    palette: [],
    flowers: [],
    rocks: [],
    crystals: [],
    naturalElements: [],
    charms: [],
    gardenTone: `${input.mood}, ${input.season}, personally interpreted`
  };
}

function normalizeThemes(themes, mood) {
  const merged = [...(themes ?? []), ...(moodThemes[mood] ?? [])];
  return [...new Set(merged)].filter((theme) => themeLibrary[theme]);
}

function resolvePalette(inputPalette, record, source, random) {
  if (inputPalette !== "surprise") return inputPalette;
  const fromRecord = record.palette?.join(" ").toLowerCase() ?? "";
  if (fromRecord.includes("rose") || fromRecord.includes("pink")) return "rose";
  if (fromRecord.includes("blue") || fromRecord.includes("teal")) return "tide";
  if (fromRecord.includes("moon") || fromRecord.includes("silver")) return "moon";
  return choose(source.palettes, random) ?? "storybook";
}

function createPlacements(random, intensity, magicalBoost, earthyBoost) {
  const count = Number(intensity) + 7;
  const placements = [];
  const kinds = ["flower", "plant", "stone", "crystal", "feature", "charm"];
  for (let i = 0; i < count; i += 1) {
    let kind = kinds[i % kinds.length];
    if (magicalBoost && i > count - 3) kind = "crystal";
    if (earthyBoost && i > count - 3) kind = i % 2 ? "stone" : "plant";
    placements.push({
      kind,
      x: 42 + Math.floor(random() * 556),
      y: 58 + Math.floor(random() * 346),
      scale: 0.75 + random() * 0.8,
      rotate: -14 + random() * 28,
      opacity: 0.82 + random() * 0.15
    });
  }
  return placements;
}

function buildExplanation(record, elements, input, primaryTheme, fallback) {
  const intro = fallback
    ? "This exact name is not in the starter origin dataset yet, so the garden leans on name shape, selected preferences, and symbolic mappings."
    : `${record.name} is connected with ${record.meanings.join(", ")} and ${record.origins.join(", ")} origin notes.`;
  return [
    intro,
    `The ${elements.primaryFlower} is the main bloom because the garden's strongest theme is ${primaryTheme}.`,
    `${elements.crystal} and ${elements.rock} add the mineral language of the name: memory, protection, and texture.`,
    `${elements.feature} reflects your ${input.season} season and ${input.timeOfDay} setting.`,
    `The ${elements.charm} acts like a small keepsake, turning the interpretation into something shareable.`
  ];
}

function describeSetting(timeOfDay, season, variant) {
  const variantText = variant === "magical" ? "with extra glow and mist" : variant === "earthy" ? "with moss, roots, and grounded textures" : "with a soft watercolor wash";
  return `${titleCase(season)} ${timeOfDay}, ${variantText}`;
}

function estimateSyllables(name) {
  const matches = name.toLowerCase().match(/[aeiouy]+/g);
  return Math.max(1, matches?.length ?? 1);
}

function hashString(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = seed || 1;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function choose(list, random) {
  if (!list?.length) return undefined;
  return list[Math.floor(random() * list.length)];
}

function titleCase(value) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}
