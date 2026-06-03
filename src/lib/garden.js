import { nameRecords } from "../data/names";

const themeLibrary = {
  light: {
    flowers: ["sunflower", "marigold", "golden poppy"],
    plants: ["lantern flower", "morning glory"],
    features: ["sun patch", "lantern glow"],
    palettes: ["sunrise", "meadow"]
  },
  peace: {
    flowers: ["white lily", "chamomile", "lotus"],
    plants: ["soft grass", "olive blossom"],
    features: ["quiet pond", "soft mist"],
    palettes: ["pond", "sage"]
  },
  strength: {
    flowers: ["thistle", "sunflower", "marigold"],
    plants: ["oak leaves", "rosemary"],
    features: ["protective gate", "high path"],
    palettes: ["woodland", "ember"]
  },
  love: {
    flowers: ["rose", "peony", "dahlia"],
    plants: ["cherry blossom", "sweet pea"],
    features: ["petal drift", "soft meadow"],
    palettes: ["rose", "spring"]
  },
  wisdom: {
    flowers: ["lavender", "sage", "violet"],
    plants: ["hazel branch", "olive branch"],
    features: ["herb bed", "shaded moss"],
    palettes: ["sage", "violet"]
  },
  ocean: {
    flowers: ["blue iris", "lotus", "water lily"],
    plants: ["reed grass", "sea lavender"],
    features: ["tide pool", "small pond"],
    palettes: ["pond", "tide"]
  },
  joy: {
    flowers: ["daisy", "buttercup", "golden poppy"],
    plants: ["clover", "mint sprig"],
    features: ["sun patch", "blooming meadow"],
    palettes: ["meadow", "spring"]
  },
  protection: {
    flowers: ["rosemary", "hawthorn", "thistle"],
    plants: ["rowan branch", "oak leaves"],
    features: ["garden hedge", "protective gate"],
    palettes: ["woodland", "moss"]
  },
  transformation: {
    flowers: ["morning glory", "dahlia", "moonflower"],
    plants: ["fern curl", "seedling"],
    features: ["winding path", "dawn glow"],
    palettes: ["dawn", "violet"]
  },
  mystery: {
    flowers: ["moonflower", "night violet", "water lily"],
    plants: ["silver grass", "fern curl"],
    features: ["stars", "soft fog"],
    palettes: ["moon", "violet"]
  },
  earth: {
    flowers: ["sage", "dahlia", "chamomile"],
    plants: ["moss", "fern curl", "root sprig"],
    features: ["moss patch", "root arch"],
    palettes: ["moss", "woodland"]
  },
  moon: {
    flowers: ["moonflower", "white lily", "night violet"],
    plants: ["silver grass", "soft grass"],
    features: ["moonlit pond", "stars"],
    palettes: ["moon", "pond"]
  }
};

export const paletteSets = {
  pulp: ["#182536", "#1f8f6f", "#f0b85d", "#c94f62", "#090d14"],
  watercolor: ["#fff6cf", "#54b878", "#e987a8", "#8bcfd2", "#4d6846"],
  botanical: ["#f7f0dc", "#6f8d63", "#c892a9", "#aebfba", "#384532"],
  nocturne: ["#f0ead4", "#536a55", "#b7a4e3", "#283f55", "#202926"],
  coastal: ["#f8efcf", "#80a95e", "#d9a4bd", "#7fa7c7", "#4b5e51"],
  glade: ["#f7f5d8", "#22b86f", "#f45f9a", "#39b7d8", "#3e6548"],
  greenhouse: ["#fff8dc", "#0f8f5d", "#f37c5f", "#83d7b3", "#4b6b3f"],
  petalpond: ["#f5f8df", "#43c878", "#f6a5c8", "#2d9fd3", "#4c6f55"],
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

const scenePresets = {
  cottage: {
    label: "Cottage Garden",
    features: ["painted cottage", "curved path", "border flowers"],
    atmosphere: "a tucked-away cottage garden"
  },
  koi: {
    label: "Koi Pond",
    features: ["dark garden pond", "floating lily pads", "painted fish movement"],
    atmosphere: "a quiet water garden with layered lily pads"
  },
  botanical: {
    label: "Botanical Panel",
    features: ["pressed-flower border", "ornamental leaves", "tall botanical stems"],
    atmosphere: "an illustrated botanical panel with fine garden detail"
  },
  meadow: {
    label: "Meadow Pond",
    features: ["quiet pond", "wide meadow", "wildflower islands"],
    atmosphere: "an open meadow garden with water"
  },
  greenhouse: {
    label: "Greenhouse",
    features: ["glasshouse light", "hanging plants", "potted greenery"],
    atmosphere: "a warm indoor greenhouse garden"
  },
  mountain: {
    label: "Mountain Field",
    features: ["distant mountains", "reflecting water", "alpine flowers"],
    atmosphere: "a mountain field full of small blooms"
  },
  coastal: {
    label: "Coastal Bloom",
    features: ["sea cliff meadow", "coastal haze", "wind-brushed flowers"],
    atmosphere: "a coastal hillside garden above quiet water"
  },
  nocturne: {
    label: "Nocturne Florals",
    features: ["moonlit blossoms", "deep foliage", "violet evening glow"],
    atmosphere: "a night garden of pale blossoms and deep foliage"
  },
  blossom: {
    label: "Blossom Garden",
    features: ["blossom canopy", "arched bridge", "soft water"],
    atmosphere: "a quiet blossom garden beside water"
  }
};

export function generateGarden(input) {
  const name = sanitizeName(input.name);
  const record = findRecord(name);
  const personalRecord = input.personalMode ? createPersonalRecord(name, input) : null;
  const fallback = !record && !personalRecord;
  const base = enrichRecord(personalRecord ?? record ?? createFallbackRecord(name, input));
  const nameThemes = normalizeThemes(base.themes);
  const themes = normalizeThemes(base.themes, input.mood);
  const seed = hashString(`${name}-${input.mood}-${input.season}-${input.timeOfDay}-${input.palette}-${input.scene}-${input.intensity}-${input.layoutSeed}-${input.variant}-${input.personalWords}-${input.personalMemory}-${input.keepsake}`);
  const random = seededRandom(seed);
  const isNameLedScene = !input.scene || input.scene === "name-led";
  const primaryTheme = choose(isNameLedScene && nameThemes.length ? nameThemes : themes, random);
  const secondaryTheme = choose(themes.filter((theme) => theme !== primaryTheme), random) ?? themes[0];
  const sourceA = themeLibrary[primaryTheme] ?? themeLibrary.earth;
  const sourceB = themeLibrary[secondaryTheme] ?? themeLibrary.peace;
  const paletteKey = resolvePalette(input.palette, base, sourceA, random);
  const palette = paletteSets[paletteKey] ?? paletteSets.storybook;
  const variant = input.variant ?? "balanced";
  const sceneKey = isNameLedScene ? resolveNameLedScene(base, primaryTheme, secondaryTheme, input.mood, random) : scenePresets[input.scene] ? input.scene : resolveScene(primaryTheme, input.mood);
  const scene = scenePresets[sceneKey];
  const signature = buildNameSignature(name, base, themes, primaryTheme, secondaryTheme, random);

  const elements = {
    scene: scene.label,
    primaryFlower: choose(base.flowers, random) ?? choose(sourceA.flowers, random),
    secondaryPlant: choose(base.naturalElements, random)?.includes("branch")
      ? choose(sourceB.plants, random)
      : choose(sourceB.plants, random) ?? choose(sourceB.flowers, random),
    feature: choose([...scene.features, ...seasonFeatures[input.season], ...timeFeatures[input.timeOfDay], ...base.naturalElements, ...sourceA.features], random),
    accent: choose([...sourceB.features, ...sourceB.plants, ...base.naturalElements], random) ?? "soft leaf wash",
    crystal: choose(base.crystals, random) ?? choose(["clear quartz", "rose quartz", "moonstone", "citrine", "hematite"], random),
    stone: choose(base.rocks, random) ?? choose(["river stone", "moss stone", "sandstone", "slate pebble"], random),
    charm: choose(base.charms, random) ?? choose(["seed charm", "small key charm", "ribbon charm", "lantern charm"], random),
    atmosphere: scene.atmosphere
  };

  const placements = createPlacements(random, input.intensity, variant, sceneKey, signature);
  const tone = base.gardenTone;
  const gardenTitle = `${name}'s ${titleCase(primaryTheme)} ${scene.label}`;
  const poeticDescription = `${titleCase(name)} grows as ${scene.atmosphere}: ${tone}, with ${elements.primaryFlower}, ${elements.secondaryPlant}, ${elements.feature}, and ${elements.crystal} painted from the sound and symbolism of the name.`;

  return {
    name,
    fallback,
    record: base,
    themes,
    primaryTheme,
    secondaryTheme,
    paletteKey,
    palette,
    sceneKey,
    scene,
    signature,
    elements,
    placements,
    gardenTitle,
    poeticDescription,
    weather: describeSetting(input.timeOfDay, input.season, input.variant),
    confidenceLabel: base.confidence ?? (fallback ? "Interpretive" : "Medium confidence"),
    altText: `A watercolor pixel garden for ${name}, featuring ${elements.primaryFlower}, ${elements.secondaryPlant}, ${elements.feature}, ${elements.crystal}, and a ${signature.motif} motif in a ${scene.label} setting.`,
    shareSeed: buildShareSeed(input),
    discoveries: buildDiscoveries(base, elements, signature, scene, primaryTheme),
    explanation: buildExplanation(base, elements, input, primaryTheme, fallback, isNameLedScene, signature),
    etymologyNote: buildEtymologyNote(base, name, themes, elements, signature, fallback),
    caption: `GardenByte grew ${gardenTitle}: ${poeticDescription}`,
    markdown: `[![${gardenTitle}](./gardenbyte-${name.toLowerCase()}.png)](https://github.com)  \nMade with GardenByte, a tiny name garden generator.`,
    gardenCard: `${gardenTitle}\n${base.meanings.join(", ")}\nSymbols: ${elements.primaryFlower}, ${elements.crystal}, ${elements.charm}\n${poeticDescription}`
  };
}

function enrichRecord(record) {
  return {
    rocks: [],
    crystals: [],
    naturalElements: [],
    charms: [],
    sources: ["Starter symbolic dataset"],
    confidence: "Medium confidence",
    ...record
  };
}

function createPersonalRecord(name, input) {
  const words = String(input.personalWords || "").split(/[, ]+/).map((word) => word.trim().toLowerCase()).filter(Boolean);
  const text = `${words.join(" ")} ${input.personalMemory || ""} ${input.keepsake || ""}`.toLowerCase();
  const themeHints = [];
  if (text.match(/brave|bold|protect|family|shield/)) themeHints.push("strength", "protection");
  if (text.match(/soft|heal|calm|friend|peace/)) themeHints.push("peace", "love");
  if (text.match(/bright|sun|joy|adventure|spark/)) themeHints.push("joy", "light");
  if (text.match(/ocean|shell|water|river|rain/)) themeHints.push("ocean", "peace");
  if (text.match(/moon|dream|strange|night|memory/)) themeHints.push("mystery", "moon");
  if (text.match(/ground|root|stone|loyal|earth/)) themeHints.push("earth", "wisdom");
  const themes = [...new Set([...(themeHints.length ? themeHints : ["transformation", "earth"]), ...(moodThemes[input.mood] ?? [])])];
  return {
    name,
    origins: ["Personal meaning mode"],
    meanings: words.length ? words : ["self-defined meaning"],
    historicalContext: "This garden uses personal associations supplied by the visitor instead of treating etymology as the only source of meaning.",
    themes,
    palette: [],
    flowers: text.includes("soft") ? ["chamomile", "lavender"] : text.includes("brave") ? ["thistle", "sunflower"] : ["dahlia", "morning glory"],
    rocks: [input.keepsake?.includes("shell") ? "shell-stone" : "memory pebble"],
    crystals: [text.includes("moon") ? "moonstone" : text.includes("bright") ? "citrine" : "clear quartz"],
    naturalElements: [input.personalMemory || "memory path", input.keepsake || "keepsake charm"],
    charms: [input.keepsake || "keepsake charm"],
    gardenTone: words.length ? words.slice(0, 3).join(", ") : `${input.mood}, self-defined`,
    confidence: "Personal meaning",
    sources: ["Visitor-supplied association"]
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
    historicalContext: "We do not have a complete etymology record for this name yet, so this garden is based on letter shape, syllable rhythm, selected mood, and symbolic sound patterns.",
    themes: [firstTheme, lengthTheme, syllableTheme, ...(moodThemes[input.mood] ?? [])],
    palette: [],
    flowers: [],
    rocks: ["seed stone"],
    crystals: ["clear quartz"],
    naturalElements: ["memory path"],
    charms: ["unknown-name seed charm"],
    confidence: "Interpretive",
    sources: ["Fallback sound-symbol mapping"],
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
  return choose(["pulp", "nocturne", "watercolor", "glade", "greenhouse", "petalpond", ...(source.palettes ?? [])], random) ?? "pulp";
}

function resolveScene(primaryTheme, mood) {
  if (primaryTheme === "ocean" || primaryTheme === "peace") return "meadow";
  if (primaryTheme === "moon" || primaryTheme === "mystery") return "nocturne";
  if (primaryTheme === "light" || mood === "bright") return "mountain";
  if (primaryTheme === "love" || primaryTheme === "transformation") return "blossom";
  if (primaryTheme === "wisdom" || primaryTheme === "earth") return "greenhouse";
  return "cottage";
}

function resolveNameLedScene(record, primaryTheme, secondaryTheme, mood, random) {
  const text = [...(record.meanings ?? []), ...(record.origins ?? []), ...(record.naturalElements ?? []), record.gardenTone ?? ""].join(" ").toLowerCase();
  const themeText = [primaryTheme, ...(record.themes ?? [])].join(" ");
  if (themeText.includes("ocean") || text.match(/water|sea|ocean|island|pond|tide|river|rain/)) return choose(["koi", "meadow", "coastal"], random);
  if (themeText.match(/moon|mystery/) || text.match(/moon|night|silver|mystery|magic/)) return "nocturne";
  if (themeText.match(/love|transformation/) || text.match(/flower|beloved|grace|petal|rose|blossom|beauty/)) return choose(["blossom", "botanical", "cottage"], random);
  if (themeText.includes("light") || text.match(/light|bright|dawn|rising|high|torch|sun/)) return choose(["mountain", "cottage", "meadow"], random);
  if (themeText.match(/wisdom|earth/) || text.match(/tree|root|hazel|moss|earth|sage|wood/)) return choose(["greenhouse", "botanical", "cottage"], random);
  if (themeText.match(/strength|protection/) || text.match(/strength|guard|favored|faithful|devotion|shield/)) return choose(["cottage", "mountain", "greenhouse"], random);
  if (mood === "dreamy") return choose(["nocturne", "blossom", "meadow"], random);
  if (mood === "bright") return choose(["mountain", "meadow", "cottage"], random);
  return resolveScene(primaryTheme, mood);
}

function buildNameSignature(name, record, themes, primaryTheme, secondaryTheme, random) {
  const compactName = name.toLowerCase().replace(/[^a-z]/g, "");
  const vowels = compactName.match(/[aeiouy]/g)?.length ?? 0;
  const consonants = Math.max(1, compactName.length - vowels);
  const text = [...(record.meanings ?? []), ...(record.naturalElements ?? []), ...(record.flowers ?? []), record.gardenTone ?? "", ...(record.themes ?? []), primaryTheme].join(" ").toLowerCase();
  let motif = "wildflower";
  if (text.match(/water|sea|ocean|island|pond|tide|river|rain|iris|lily/)) motif = "water";
  else if (text.match(/light|bright|dawn|sun|torch|rising|high|fortunate/)) motif = "light";
  else if (text.match(/moon|night|silver|mystery|magic/)) motif = "moon";
  else if (text.match(/flower|beloved|grace|rose|peony|blossom|beauty|love/)) motif = "blossom";
  else if (text.match(/tree|root|moss|earth|hazel|oak|wood|sage/)) motif = "woodland";
  else if (text.match(/strength|guard|protect|faithful|devotion|brave/)) motif = "path";

  return {
    motif,
    rhythm: compactName.length <= 4 ? "open" : compactName.length >= 8 ? "layered" : "balanced",
    vowelRatio: vowels / Math.max(1, compactName.length),
    densityBoost: compactName.length >= 8 ? 4 : compactName.length <= 4 ? -1 : 2,
    leftWeight: random() > 0.5 ? "left" : "right",
    themePair: [primaryTheme, secondaryTheme]
  };
}

function createPlacements(random, intensity, variant, sceneKey, signature) {
  const count = Math.max(9, Number(intensity) + 10 + (signature?.densityBoost ?? 0));
  const placements = [];
  const kindSets = {
    balanced: ["flowerMass", "leafMass", "wash", "reeds", "flowerMass"],
    magical: ["mist", "flowerMass", "wash", "reeds", "flowerMass", "mist"],
    earthy: ["leafMass", "reeds", "wash", "leafMass", "flowerMass"],
    lush: ["flowerMass", "leafMass", "flowerMass", "reeds", "wash", "flowerMass", "leafMass"]
  };
  const signatureKinds = {
    water: ["waterLeaf", "reeds", "mist", "wash"],
    light: ["meadowDrift", "flowerMass", "mist", "wash"],
    moon: ["petalCloud", "mist", "tallStem", "waterLeaf"],
    blossom: ["petalCloud", "flowerMass", "tallStem", "flowerMass"],
    woodland: ["leafMass", "reeds", "tallStem", "leafMass"],
    path: ["reeds", "leafMass", "meadowDrift", "wash"],
    wildflower: ["flowerMass", "meadowDrift", "tallStem", "wash"]
  };
  const kinds = [...(kindSets[variant] ?? kindSets.balanced), ...(signatureKinds[signature?.motif] ?? signatureKinds.wildflower)];
  for (let i = 0; i < count; i += 1) {
    let kind = kinds[i % kinds.length];
    if (sceneKey === "greenhouse" && i % 5 === 0) kind = "pottedMass";
    if (sceneKey === "mountain" && i % 4 === 0) kind = "meadowDrift";
    if (sceneKey === "coastal" && i % 4 === 0) kind = "meadowDrift";
    if (sceneKey === "blossom" && i % 4 === 0) kind = "petalCloud";
    if (sceneKey === "nocturne" && i % 4 === 0) kind = "petalCloud";
    if (sceneKey === "koi" && i % 5 === 0) kind = "waterLeaf";
    if (sceneKey === "botanical" && i % 4 === 0) kind = "tallStem";
    const layered = signature?.rhythm === "layered";
    const open = signature?.rhythm === "open";
    const leftWeighted = signature?.leftWeight === "left";
    const anchor = leftWeighted ? 54 : 586;
    const drift = leftWeighted ? 1 : -1;
    const rawX = layered && i % 3 === 0 ? anchor + drift * Math.floor(random() * 260) : 42 + Math.floor(random() * 556);
    placements.push({
      kind,
      x: Math.max(30, Math.min(610, rawX)),
      y: open ? 196 + Math.floor(random() * 214) : variant === "lush" ? 205 + Math.floor(random() * 215) : 58 + Math.floor(random() * 346),
      scale: open ? 0.64 + random() * 0.58 : variant === "lush" ? 0.48 + random() * 0.52 : 0.75 + random() * 0.8,
      rotate: -14 + random() * 28,
      opacity: 0.82 + random() * 0.15
    });
  }
  return placements;
}

function buildExplanation(record, elements, input, primaryTheme, fallback, isNameLedScene, signature) {
  const intro = fallback
    ? "This exact name is not in the starter origin dataset yet, so the garden leans on name shape, selected preferences, and symbolic mappings."
    : `${record.name} is connected with ${record.meanings.join(", ")} and ${record.origins.join(", ")} origin notes.`;
  return [
    intro,
    isNameLedScene
      ? `The name-led scene mode chose ${elements.scene} and a ${signature.motif} signature so this name changes the composition, not just the caption.`
      : `The ${elements.scene} preset sets the composition, so the result feels like a place rather than a collection of icons.`,
    `The ${elements.primaryFlower} and ${elements.secondaryPlant} guide the main botanical masses because the garden's strongest theme is ${primaryTheme}.`,
    `${elements.feature} reflects your ${input.season} season and ${input.timeOfDay} setting.`,
    `The ${elements.accent} appears as a loose painted accent, adding atmosphere without turning the scene into a literal object collection.`,
    `${elements.crystal}, ${elements.stone}, and ${elements.charm} add collectible details for the garden journal and hidden-symbol system.`
  ];
}

function buildDiscoveries(record, elements, signature, scene, primaryTheme) {
  return [
    { id: "flower", label: elements.primaryFlower, type: "Bloom", note: `${elements.primaryFlower} carries the ${primaryTheme} theme into the main flower masses.` },
    { id: "crystal", label: elements.crystal, type: "Crystal", note: `${elements.crystal} anchors the garden's mood and adds a collectible keepsake.` },
    { id: "feature", label: elements.feature, type: "Feature", note: `${elements.feature} was chosen from the scene, season, time of day, and name symbolism.` },
    { id: "signature", label: `${signature.motif} motif`, type: "Hidden motif", note: `The ${signature.motif} signature changes the composition so the name affects the actual artwork.` },
    { id: "scene", label: scene.label, type: "Biome", note: `${scene.label} turns the meaning into a place instead of a flat icon set.` },
    { id: "charm", label: elements.charm, type: "Charm", note: `${elements.charm} gives this garden a tiny object to collect in the journal.` }
  ];
}

function buildShareSeed(input) {
  const keys = ["name", "mood", "palette", "season", "timeOfDay", "scene", "intensity", "layoutSeed", "variant", "personalMode", "personalWords", "personalMemory", "keepsake"];
  return keys.reduce((seed, key) => {
    if (input[key] !== undefined && input[key] !== "") seed[key] = input[key];
    return seed;
  }, {});
}


function buildEtymologyNote(record, name, themes, elements, signature, fallback) {
  if (fallback) {
    return `${name}\nOrigin status: record pending\nMeaning basis: symbolic interpretation from the name's sound, length, selected mood, and garden preferences.\nGarden themes: ${themes.join(", ")}\nVisual translation: ${elements.scene}, ${elements.primaryFlower}, ${elements.secondaryPlant}, ${signature.motif} signature`;
  }
  return `${record.name}\nOrigins: ${record.origins.join(", ")}\nMeanings: ${record.meanings.join(", ")}\nContext: ${record.historicalContext}\nGarden themes: ${themes.join(", ")}\nVisual translation: ${elements.scene}, ${elements.primaryFlower}, ${elements.secondaryPlant}, ${signature.motif} signature`;
}

function describeSetting(timeOfDay, season, variant) {
  const variantText =
    variant === "magical"
      ? "with extra glow and mist"
      : variant === "earthy"
        ? "with moss, roots, and grounded textures"
        : variant === "lush"
          ? "with bright greenery, tiny blossoms, and a soft painted path"
          : "with a soft watercolor wash";
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
