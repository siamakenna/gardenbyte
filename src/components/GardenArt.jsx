import React, { forwardRef, useMemo } from "react";

const VIEWBOX = "0 0 640 460";

const defaultLayers = {
  terrain: true,
  water: true,
  paths: true,
  structures: true,
  blooms: true,
  details: true,
  signature: true,
  canopy: true
};

const GardenArt = forwardRef(function GardenArt({ garden, layers = defaultLayers, onSymbolSelect }, ref) {
  const [paper, leaf, bloom, water, ink] = garden.palette;
  const layerVisibility = { ...defaultLayers, ...layers };
  const accents = useMemo(
    () => ({
      paper,
      leaf,
      bloom,
      water,
      ink,
      sky: mix(water, "#f9f6dc", 0.72),
      sun: mix(bloom, "#fff3a4", 0.48),
      moss: mix(leaf, "#fff6c9", 0.18),
      petal: mix(bloom, "#fff7ef", 0.2),
      path: mix(paper, ink, 0.18),
      glow: mix(paper, bloom, 0.45),
      deepLeaf: mix(leaf, ink, 0.28)
    }),
    [paper, leaf, bloom, water, ink]
  );

  return (
    <svg
      ref={ref}
      className="garden-art"
      viewBox={VIEWBOX}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label={garden.gardenTitle}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />
        </filter>
        <filter id="pigmentBloom" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.45" />
        </filter>
        <radialGradient id="gardenWash" cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor={accents.glow} />
          <stop offset="58%" stopColor={paper} />
          <stop offset="100%" stopColor={mix(leaf, paper, 0.5)} />
        </radialGradient>
        <linearGradient id="pondGradient" x1="0%" x2="100%">
          <stop offset="0%" stopColor={mix(water, paper, 0.55)} />
          <stop offset="100%" stopColor={mix(water, ink, 0.12)} />
        </linearGradient>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={accents.sky} />
          <stop offset="100%" stopColor={mix(paper, accents.sky, 0.26)} />
        </linearGradient>
        <linearGradient id="leafGradient" x1="0%" x2="100%">
          <stop offset="0%" stopColor={mix(leaf, "#fff49c", 0.12)} />
          <stop offset="100%" stopColor={mix(leaf, ink, 0.12)} />
        </linearGradient>
        <radialGradient id="noirVignette" cx="58%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="64%" stopColor={ink} stopOpacity="0.12" />
          <stop offset="100%" stopColor={ink} stopOpacity="0.56" />
        </radialGradient>
        <pattern id="pixelGrid" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="transparent" />
          <rect width="1" height="8" fill={mix(ink, "#000000", 0.3)} opacity="0.16" />
          <rect width="8" height="1" fill={mix(ink, "#000000", 0.3)} opacity="0.12" />
        </pattern>
        <pattern id="pixelNoise" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="2" y="4" width="3" height="3" fill={mix(paper, "#ffffff", 0.15)} opacity="0.18" />
          <rect x="13" y="8" width="2" height="2" fill={bloom} opacity="0.16" />
          <rect x="8" y="15" width="3" height="3" fill={water} opacity="0.14" />
        </pattern>
      </defs>

      <rect width="640" height="460" rx="34" fill="url(#skyGradient)" />
      <PaperTexture colors={accents} />
      <SceneBackdrop colors={accents} scene={garden.sceneKey} />
      <g filter="url(#watercolor)" opacity="0.95">
        {layerVisibility.terrain && <GardenBeds colors={accents} scene={garden.sceneKey} />}
        {layerVisibility.water && <SceneWater colors={accents} scene={garden.sceneKey} />}
        {layerVisibility.paths && <ScenePath colors={accents} scene={garden.sceneKey} />}
        {layerVisibility.structures && <SceneArchitecture colors={accents} scene={garden.sceneKey} />}
        {layerVisibility.blooms && <FlowerSpeckles colors={accents} scene={garden.sceneKey} />}
        {layerVisibility.details && <WatercolorDetails colors={accents} />}

        {layerVisibility.blooms &&
          garden.placements.map((item, index) => (
            <GardenElement key={`${item.kind}-${index}`} item={item} index={index} colors={accents} garden={garden} />
          ))}

        {layerVisibility.signature && <NameSignatureLayer colors={accents} signature={garden.signature} />}
        {layerVisibility.canopy && <Canopy colors={accents} />}
      </g>
      {onSymbolSelect && <DiscoveryHotspots garden={garden} onSymbolSelect={onSymbolSelect} />}
      <PulpPixelGrade colors={accents} />
    </svg>
  );
});

function DiscoveryHotspots({ garden, onSymbolSelect }) {
  const points = [
    ["flower", 170, 330],
    ["crystal", 486, 350],
    ["feature", 320, 245],
    ["signature", 520, 120],
    ["scene", 92, 150],
    ["charm", 408, 404]
  ];
  return (
    <g className="svg-hotspots" aria-label="Clickable garden discoveries">
      {points.map(([id, x, y]) => {
        const discovery = garden.discoveries?.find((item) => item.id === id);
        if (!discovery) return null;
        return (
          <g
            key={id}
            className="svg-hotspot"
            role="button"
            tabIndex="0"
            aria-label={`${discovery.type}: ${discovery.label}`}
            onClick={() => onSymbolSelect(discovery)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSymbolSelect(discovery);
              }
            }}
          >
            <circle cx={x} cy={y} r="22" fill="#ffffff" opacity="0.001" />
            <circle cx={x} cy={y} r="5" fill="#f0b85d" opacity="0.7" />
            <circle cx={x} cy={y} r="13" fill="none" stroke="#f0b85d" strokeWidth="2" strokeDasharray="4 4" opacity="0.52" />
          </g>
        );
      })}
    </g>
  );
}

function PulpPixelGrade({ colors }) {
  return (
    <g pointerEvents="none">
      <rect width="640" height="460" fill="url(#noirVignette)" />
      <path d="M0 330 C96 288 186 314 286 268 C392 220 486 244 640 184 V460 H0Z" fill={mix(colors.ink, "#000000", 0.22)} opacity="0.2" />
      <path d="M0 438 H640 V460 H0Z" fill={mix(colors.ink, "#000000", 0.28)} opacity="0.24" />
      <rect width="640" height="460" fill="url(#pixelGrid)" opacity="0.42" />
      <rect width="640" height="460" fill="url(#pixelNoise)" opacity="0.48" />
      <g opacity="0.28">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <rect key={index} x={38 + index * 94} y={76 + ((index * 47) % 260)} width={30 + (index % 3) * 18} height="6" fill={index % 2 ? colors.bloom : colors.sun} />
        ))}
      </g>
    </g>
  );
}

function PaperTexture({ colors }) {
  return (
    <g opacity="0.18">
      {Array.from({ length: 28 }).map((_, index) => (
        <path
          key={index}
          d={`M${-30 + index * 26} ${18 + (index % 5) * 84} C${42 + index * 19} ${-8 + (index % 4) * 92} ${126 + index * 8} ${72 + (index % 6) * 59} ${690} ${38 + (index % 7) * 62}`}
          fill="none"
          stroke={index % 2 ? colors.paper : mix(colors.leaf, colors.paper, 0.42)}
          strokeWidth={1 + (index % 3)}
          opacity="0.28"
        />
      ))}
    </g>
  );
}

function SceneBackdrop({ colors, scene }) {
  const mountain = scene === "mountain";
  const greenhouse = scene === "greenhouse";
  const blossom = scene === "blossom" || scene === "nocturne";
  const nocturne = scene === "nocturne";
  const coastal = scene === "coastal";
  const koi = scene === "koi";
  return (
    <g>
      {nocturne && <rect width="640" height="460" fill={mix(colors.water, colors.ink, 0.34)} opacity="0.5" />}
      <circle cx={nocturne ? 520 : 535} cy={nocturne ? 82 : 70} r={nocturne ? 30 : 42} fill={nocturne ? mix(colors.paper, colors.water, 0.18) : colors.sun} opacity={nocturne ? 0.7 : 0.56} />
      <path d="M28 91 C79 59 139 83 190 61 C235 43 277 69 314 58 C361 44 410 60 450 78" fill="none" stroke="#fff9df" strokeWidth="20" strokeLinecap="round" opacity="0.58" />
      {(mountain || coastal) && (
        <>
          <path d={coastal ? "M0 188 C91 151 153 172 234 132 C312 94 387 126 466 99 C535 76 587 103 640 82 V244 H0Z" : "M0 174 L96 72 L161 156 L232 62 L319 166 L404 84 L510 178 L640 96 V244 H0Z"} fill={mix(colors.water, colors.paper, 0.48)} opacity="0.8" />
          {!coastal && <path d="M91 77 L121 126 L97 113 L72 137Z M226 69 L260 124 L232 109 L202 139Z M400 91 L430 139 L402 125 L376 149Z" fill={mix("#ffffff", colors.paper, 0.2)} opacity="0.72" />}
          {coastal && <path d="M0 228 C89 205 177 220 262 193 C349 165 459 186 640 145 V270 H0Z" fill={mix(colors.water, "#ffffff", 0.18)} opacity="0.48" />}
        </>
      )}
      {greenhouse && (
        <g opacity="0.5">
          <path d="M86 40 H553 V228 H86Z" fill={mix("#ffffff", colors.sky, 0.22)} stroke={mix(colors.ink, colors.paper, 0.72)} strokeWidth="2" />
          {Array.from({ length: 8 }).map((_, index) => (
            <path key={index} d={`M${116 + index * 55} 40 V228`} stroke={mix(colors.ink, colors.paper, 0.76)} strokeWidth="1.2" />
          ))}
          <path d="M86 108 H553 M86 174 H553" stroke={mix(colors.ink, colors.paper, 0.78)} strokeWidth="1.2" />
        </g>
      )}
      <path d="M0 159 C70 98 125 131 177 99 C247 55 302 113 359 79 C416 48 456 94 512 71 C570 48 610 73 640 91 V228 H0Z" fill={mix(colors.water, colors.paper, 0.36)} opacity="0.55" />
      <path d="M0 176 C82 121 173 145 258 122 C356 94 427 126 510 107 C562 95 605 96 640 115 V262 H0Z" fill={mix(colors.leaf, colors.paper, 0.42)} opacity="0.78" />
      <path d="M0 225 C88 185 178 199 259 174 C354 144 457 160 546 134 C586 123 616 126 640 139 V460 H0Z" fill="url(#leafGradient)" opacity="0.9" />
      <path d="M0 306 C91 270 176 282 262 247 C347 212 446 236 526 205 C573 186 612 190 640 205 V460 H0Z" fill={koi ? mix(colors.water, colors.ink, 0.16) : mix(colors.leaf, "#22d17a", 0.22)} opacity={koi ? 0.86 : 0.8} />
      <path d="M0 385 C104 330 195 356 305 319 C431 276 525 315 640 268 V460 H0Z" fill={mix(colors.leaf, colors.ink, 0.08)} opacity="0.82" />
      {blossom && <path d="M-12 124 C84 48 177 60 244 113 C163 126 75 154 -12 124Z M392 101 C488 40 584 45 660 107 C558 109 482 135 392 101Z" fill={mix(colors.bloom, colors.paper, 0.34)} opacity="0.46" />}
      {scene === "botanical" && <BotanicalPanelFrame colors={colors} />}
    </g>
  );
}

function BotanicalPanelFrame({ colors }) {
  return (
    <g opacity="0.46">
      <rect x="42" y="34" width="556" height="392" rx="22" fill="none" stroke={mix(colors.ink, colors.paper, 0.62)} strokeWidth="2" />
      <rect x="58" y="50" width="524" height="360" rx="18" fill="none" stroke={mix(colors.leaf, colors.paper, 0.2)} strokeWidth="1.4" />
      {[82, 558].map((x) => (
        <g key={x}>
          {Array.from({ length: 7 }).map((_, index) => (
            <path
              key={index}
              d={`M${x} ${72 + index * 44} C${x + (x < 100 ? 26 : -26)} ${82 + index * 42} ${x + (x < 100 ? 25 : -25)} ${104 + index * 42} ${x} ${116 + index * 43}`}
              fill="none"
              stroke={mix(colors.leaf, colors.ink, 0.1)}
              strokeWidth="2"
              opacity="0.56"
            />
          ))}
        </g>
      ))}
    </g>
  );
}

function SceneArchitecture({ colors, scene }) {
  if (scene === "greenhouse") return <GreenhouseInterior colors={colors} />;
  if (scene === "blossom") return <BlossomBridge colors={colors} />;
  if (scene === "nocturne") return <MoonBranches colors={colors} />;
  if (scene === "mountain") return null;
  if (scene === "coastal") return null;
  if (scene === "koi") return <KoiMovement colors={colors} />;
  if (scene === "meadow") return null;
  return <Cottage colors={colors} />;
}

function MoonBranches({ colors }) {
  return (
    <g opacity="0.58">
      <path d="M-18 164 C78 95 169 92 256 145 M392 128 C478 76 567 79 660 121" fill="none" stroke={mix(colors.ink, colors.paper, 0.3)} strokeWidth="7" strokeLinecap="round" />
      {[37, 75, 126, 436, 500, 562].map((x, index) => (
        <ellipse key={x} cx={x} cy={index < 3 ? 135 - index * 11 : 112 + index * 2} rx="12" ry="21" fill={mix(colors.bloom, colors.paper, 0.28)} opacity="0.52" transform={`rotate(${-38 + index * 14} ${x} ${index < 3 ? 135 - index * 11 : 112 + index * 2})`} />
      ))}
    </g>
  );
}

function KoiMovement({ colors }) {
  return (
    <g opacity="0.62">
      {[
        [232, 304, -18],
        [388, 331, 16],
        [482, 280, -28]
      ].map(([x, y, rotate], index) => (
        <g key={x} transform={`translate(${x} ${y}) rotate(${rotate})`}>
          <ellipse rx="34" ry="11" fill={index % 2 ? mix("#fff8e8", colors.bloom, 0.16) : mix("#f07d54", colors.paper, 0.18)} />
          <path d="M-38 0 L-58 -12 L-52 0 L-58 12Z" fill={mix(colors.bloom, colors.paper, 0.12)} opacity="0.78" />
          <path d="M-10 -6 C3 0 14 1 28 -4" fill="none" stroke={mix(colors.ink, colors.paper, 0.6)} strokeWidth="1.2" opacity="0.35" />
        </g>
      ))}
    </g>
  );
}

function Cottage({ colors }) {
  return (
    <g transform="translate(104 132)" opacity="0.9">
      <path d="M-24 75 C18 46 71 51 109 75 C83 88 17 89 -24 75Z" fill={mix(colors.leaf, colors.ink, 0.1)} opacity="0.28" />
      <path d="M0 14 L42 -13 L88 14 V76 H0Z" fill={mix(colors.paper, "#fff9ef", 0.28)} stroke={mix(colors.ink, colors.paper, 0.58)} strokeWidth="1.4" />
      <path d="M-11 18 L42 -27 L98 18 C70 8 24 8 -11 18Z" fill={mix(colors.bloom, colors.ink, 0.18)} stroke={mix(colors.ink, colors.bloom, 0.62)} strokeWidth="1.5" />
      <path d="M8 22 H82 V76 H8Z" fill={mix(colors.paper, colors.water, 0.16)} opacity="0.8" />
      <rect x="19" y="34" width="18" height="17" rx="2" fill={mix(colors.sky, "#ffffff", 0.3)} stroke={mix(colors.ink, colors.paper, 0.58)} strokeWidth="1.4" />
      <rect x="52" y="34" width="18" height="17" rx="2" fill={mix(colors.sky, "#ffffff", 0.28)} stroke={mix(colors.ink, colors.paper, 0.58)} strokeWidth="1.4" />
      <path d="M39 76 V49 C39 40 51 40 51 49 V76Z" fill={mix("#8f6847", colors.paper, 0.18)} stroke={mix(colors.ink, "#8f6847", 0.34)} strokeWidth="1.5" />
      <path d="M-7 82 C12 64 36 69 48 58 C62 70 88 61 105 82" fill="none" stroke={mix(colors.leaf, colors.paper, 0.06)} strokeWidth="10" strokeLinecap="round" opacity="0.8" />
      {[-4, 9, 83, 97].map((x, index) => (
        <circle key={x} cx={x} cy={71 + (index % 2) * 5} r={8} fill={index % 2 ? colors.bloom : mix("#fff6a8", colors.paper, 0.2)} opacity="0.86" />
      ))}
    </g>
  );
}

function GreenhouseInterior({ colors }) {
  return (
    <g opacity="0.78">
      <path d="M58 382 C165 313 278 340 385 292 C483 249 557 276 650 217" fill="none" stroke={mix(colors.ink, colors.leaf, 0.34)} strokeWidth="18" strokeLinecap="round" opacity="0.18" />
      {[126, 196, 472, 542].map((x, index) => (
        <g key={x} transform={`translate(${x} ${178 + (index % 2) * 24})`}>
          <path d="M-18 -28 C-6 -18 8 -20 20 -31 C13 -4 -11 2 -18 -28Z" fill={mix(colors.leaf, colors.paper, 0.12)} opacity="0.76" />
          <path d="M0 -32 V22" stroke={mix(colors.ink, colors.paper, 0.62)} strokeWidth="1.2" />
          <ellipse cy="26" rx="24" ry="9" fill={mix("#b47a58", colors.paper, 0.16)} opacity="0.72" />
        </g>
      ))}
    </g>
  );
}

function BlossomBridge({ colors }) {
  return (
    <g opacity="0.74">
      <path d="M397 279 C445 232 514 225 565 274" fill="none" stroke={mix(colors.ink, colors.paper, 0.48)} strokeWidth="12" strokeLinecap="round" />
      <path d="M396 277 C447 247 513 244 567 275" fill="none" stroke={mix(colors.paper, colors.bloom, 0.2)} strokeWidth="7" strokeLinecap="round" />
      <path d="M417 270 V292 M458 254 V279 M507 255 V280 M546 270 V293" stroke={mix(colors.ink, colors.paper, 0.5)} strokeWidth="2" opacity="0.72" />
    </g>
  );
}

function GardenBeds({ colors, scene }) {
  const greenhouse = scene === "greenhouse";
  return (
    <g opacity="0.86">
      <path d="M-12 338 C60 285 128 307 192 276 C145 344 70 365 -12 338Z" fill={mix(colors.leaf, colors.ink, 0.08)} />
      <path d="M386 246 C461 192 557 203 654 162 C626 233 506 282 386 246Z" fill={mix(colors.leaf, "#fff26d", 0.1)} />
      <path d="M282 392 C349 330 436 359 514 319 C503 394 392 429 282 392Z" fill={mix(colors.leaf, colors.water, 0.08)} />
      <path d="M8 252 C80 211 159 226 232 194" fill="none" stroke={mix(colors.leaf, colors.paper, 0.05)} strokeWidth="22" strokeLinecap="round" opacity="0.6" />
      <path d="M396 397 C466 365 540 383 625 344" fill="none" stroke={mix(colors.leaf, colors.ink, 0.06)} strokeWidth="26" strokeLinecap="round" opacity="0.66" />
      {greenhouse && <path d="M38 426 C126 348 209 374 292 318 C373 264 466 304 594 226" fill="none" stroke={mix("#caa171", colors.paper, 0.24)} strokeWidth="38" strokeLinecap="round" opacity="0.44" />}
    </g>
  );
}

function ScenePath({ colors, scene }) {
  if (scene === "koi") return null;
  if (scene === "meadow" || scene === "mountain" || scene === "coastal") return <MeadowChannels colors={colors} scene={scene} />;
  if (scene === "greenhouse") return <GreenhousePath colors={colors} />;
  if (scene === "botanical") return <BotanicalPath colors={colors} />;
  return (
    <>
      <path d="M61 445 C138 386 198 383 245 326 C294 268 362 261 407 215 C460 161 519 135 600 102" fill="none" stroke={mix("#d9c087", colors.paper, 0.32)} strokeWidth="54" strokeLinecap="round" opacity="0.74" />
      <path d="M62 443 C143 393 202 385 252 331 C300 280 366 269 413 222 C465 171 523 144 600 109" fill="none" stroke={mix(colors.paper, "#f2daa2", 0.38)} strokeWidth="29" strokeLinecap="round" opacity="0.92" />
      <SteppingStones colors={colors} />
    </>
  );
}

function BotanicalPath({ colors }) {
  return (
    <g opacity="0.32">
      <path d="M322 430 C300 348 312 261 331 175 C343 119 338 81 319 38" fill="none" stroke={mix("#d9c087", colors.paper, 0.36)} strokeWidth="34" strokeLinecap="round" />
      <path d="M319 426 C306 339 320 260 336 180 C347 120 342 82 326 40" fill="none" stroke={mix(colors.paper, "#f8edd1", 0.32)} strokeWidth="18" strokeLinecap="round" />
    </g>
  );
}

function GreenhousePath({ colors }) {
  return (
    <>
      <path d="M301 462 C286 394 294 330 327 264 C350 218 351 176 335 123" fill="none" stroke={mix("#d0b38a", colors.paper, 0.32)} strokeWidth="82" strokeLinecap="round" opacity="0.5" />
      <path d="M303 460 C292 391 302 329 334 267 C355 224 355 179 342 126" fill="none" stroke={mix(colors.paper, "#f2dcc0", 0.42)} strokeWidth="48" strokeLinecap="round" opacity="0.72" />
    </>
  );
}

function MeadowChannels({ colors, scene }) {
  return (
    <g opacity={scene === "mountain" ? 0.78 : 0.62}>
      <path d="M-20 366 C97 318 184 361 276 313 C375 261 493 299 660 224" fill="none" stroke={mix(colors.water, colors.paper, 0.28)} strokeWidth="34" strokeLinecap="round" />
      <path d="M-18 368 C101 330 188 369 280 321 C382 272 500 305 662 235" fill="none" stroke={mix(colors.water, "#ffffff", 0.18)} strokeWidth="17" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

function SceneWater({ colors, scene }) {
  if (scene === "greenhouse") return null;
  if (scene === "botanical") return null;
  const meadow = scene === "meadow" || scene === "mountain" || scene === "coastal";
  const koi = scene === "koi";
  return (
    <g opacity={meadow ? 0.72 : 0.82}>
      <ellipse cx={koi ? 342 : meadow ? 392 : 514} cy={koi ? 312 : meadow ? 314 : 329} rx={koi ? 248 : meadow ? 142 : 91} ry={koi ? 118 : meadow ? 48 : 50} fill="url(#pondGradient)" />
      <path
        d={koi ? "M120 302 C222 258 386 254 563 289 M142 352 C260 393 444 384 561 334" : meadow ? "M272 312 C323 292 418 292 514 312 M310 330 C374 347 440 344 492 328" : "M445 327 C474 307 532 305 578 321 M464 345 C492 358 536 358 562 343"}
        fill="none"
        stroke={mix(colors.paper, colors.water, 0.46)}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.75"
      />
    </g>
  );
}

function SteppingStones({ colors }) {
  return (
    <g opacity="0.72">
      {[0, 1, 2, 3, 4].map((step) => (
        <ellipse
          key={step}
          cx={230 + step * 38}
          cy={331 - step * 27}
          rx={19 - step}
          ry={8}
          fill={mix(colors.paper, colors.ink, 0.12)}
          stroke={mix(colors.ink, colors.paper, 0.68)}
          strokeWidth="1.2"
          transform={`rotate(${-14 + step * 4} ${230 + step * 38} ${331 - step * 27})`}
        />
      ))}
    </g>
  );
}

function FlowerSpeckles({ colors, scene }) {
  const total = scene === "mountain" || scene === "meadow" ? 210 : 150;
  return (
    <g opacity="0.82">
      {Array.from({ length: total }).map((_, index) => {
        const band = index % 3;
        const yBase = scene === "greenhouse" ? (band === 0 ? 238 : band === 1 ? 322 : 392) : band === 0 ? 206 : band === 1 ? 293 : 374;
        const color = index % 5 === 0 ? colors.petal : index % 5 === 1 ? "#fff4a8" : index % 5 === 2 ? mix(colors.water, "#ffffff", 0.22) : index % 5 === 3 ? mix("#ff7a62", colors.bloom, 0.34) : "#f9fff0";
        return (
          <circle
            key={index}
            cx={18 + ((index * 53) % 608)}
            cy={yBase + ((index * 31) % 72)}
            r={1.7 + (index % 4) * 0.8}
            fill={color}
          />
        );
      })}
    </g>
  );
}

function WatercolorDetails({ colors }) {
  return (
    <g opacity="0.62">
      {[72, 144, 434, 585].map((x, index) => (
        <g key={x} transform={`translate(${x} ${index % 2 ? 244 : 184}) rotate(${index % 2 ? 16 : -10})`}>
          <path
            d="M-18 8 C-9 -9 9 -13 19 2 C9 15 -8 20 -18 8Z"
            fill={index % 2 ? mix(colors.bloom, colors.paper, 0.28) : mix("#fff2a8", colors.paper, 0.12)}
            stroke={mix(colors.ink, colors.paper, 0.7)}
            strokeWidth="0.9"
          />
          <path d="M-9 5 C0 1 8 -3 14 -1" fill="none" stroke={mix(colors.ink, colors.paper, 0.72)} strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
        </g>
      ))}
      <path d="M28 421 C85 388 132 402 178 370" fill="none" stroke={mix(colors.ink, colors.leaf, 0.55)} strokeWidth="1.4" strokeLinecap="round" opacity="0.24" />
      <path d="M423 271 C466 247 512 251 560 231" fill="none" stroke={mix(colors.ink, colors.leaf, 0.55)} strokeWidth="1.4" strokeLinecap="round" opacity="0.22" />
      {[118, 328, 526].map((x, index) => (
        <g key={x} transform={`translate(${x} ${392 - index * 48}) rotate(${-16 + index * 11})`}>
          <ellipse rx="14" ry="5" fill={mix(colors.paper, colors.water, 0.22)} stroke={mix(colors.ink, colors.paper, 0.68)} strokeWidth="1" opacity="0.5" />
          <path d="M-18 2 C-6 -7 8 -8 18 0" fill="none" stroke={mix(colors.leaf, colors.paper, 0.1)} strokeWidth="2.2" strokeLinecap="round" opacity="0.62" />
        </g>
      ))}
    </g>
  );
}

function GardenElement({ item, index, colors, garden }) {
  const transform = `translate(${item.x} ${item.y}) rotate(${item.rotate}) scale(${item.scale})`;
  const common = { transform, opacity: item.opacity };
  if (item.kind === "flowerMass") return <FlowerMass {...common} colors={colors} index={index} />;
  if (item.kind === "leafMass") return <LeafMass {...common} colors={colors} index={index} />;
  if (item.kind === "reeds") return <ReedMass {...common} colors={colors} index={index} />;
  if (item.kind === "pottedMass") return <PottedMass {...common} colors={colors} index={index} />;
  if (item.kind === "meadowDrift") return <MeadowDrift {...common} colors={colors} index={index} />;
  if (item.kind === "petalCloud") return <PetalCloud {...common} colors={colors} index={index} />;
  if (item.kind === "waterLeaf") return <WaterLeafMass {...common} colors={colors} index={index} />;
  if (item.kind === "tallStem") return <TallStemMass {...common} colors={colors} index={index} />;
  if (item.kind === "mist") return <MistWash {...common} colors={colors} index={index} />;
  return <BrushWash {...common} colors={colors} index={index} />;
}

function FlowerMass({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.86}>
      <path d="M-41 19 C-23 -12 14 -26 48 -3 C35 28 -10 42 -41 19Z" fill={mix(colors.leaf, colors.paper, 0.14)} opacity="0.78" />
      {Array.from({ length: 18 }).map((_, bloom) => {
        const x = -29 + ((bloom * 17 + index * 11) % 70);
        const y = -5 + ((bloom * 23 + index * 7) % 38);
        return (
          <circle key={bloom} cx={x} cy={y} r={2.2 + (bloom % 3)} fill={bloom % 4 ? colors.bloom : mix("#fff6a8", colors.paper, 0.18)} opacity="0.72" />
        );
      })}
      <path d="M-28 12 C-7 2 18 2 38 10" fill="none" stroke={mix(colors.ink, colors.paper, 0.64)} strokeWidth="1" strokeLinecap="round" opacity="0.26" />
    </g>
  );
}

function LeafMass({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.82}>
      {Array.from({ length: 9 }).map((_, leaf) => {
        const angle = -58 + leaf * 14 + index * 3;
        return (
          <ellipse
            key={leaf}
            cx={-22 + leaf * 6}
            cy={8 + (leaf % 3) * 5}
            rx="8"
            ry={22 + (leaf % 4) * 4}
            fill={leaf % 2 ? colors.leaf : mix(colors.leaf, colors.water, 0.18)}
            transform={`rotate(${angle} ${-22 + leaf * 6} ${8 + (leaf % 3) * 5})`}
            opacity="0.68"
          />
        );
      })}
    </g>
  );
}

function ReedMass({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.76}>
      {Array.from({ length: 7 }).map((_, reed) => (
        <path
          key={reed}
          d={`M${-21 + reed * 7} 36 C${-25 + reed * 5} 14 ${-14 + reed * 7} -2 ${-18 + reed * 8} -28`}
          fill="none"
          stroke={reed % 2 ? colors.deepLeaf : mix(colors.leaf, colors.paper, 0.14)}
          strokeWidth={2 + (reed % 2)}
          strokeLinecap="round"
        />
      ))}
      {[0, 1, 2].map((bloom) => (
        <ellipse key={bloom} cx={-12 + bloom * 18} cy={-23 + bloom * 4} rx="5" ry="12" fill={bloom % 2 ? colors.bloom : mix(colors.water, colors.paper, 0.2)} opacity="0.68" />
      ))}
    </g>
  );
}

function PottedMass({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.78}>
      <path d="M-24 18 H24 L15 48 H-15Z" fill={mix("#b9825d", colors.paper, 0.22)} opacity="0.72" />
      <LeafMass transform="translate(0 0) scale(0.72)" opacity={1} colors={colors} index={index} />
    </g>
  );
}

function MeadowDrift({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.68}>
      <path d="M-55 8 C-28 -5 25 -7 58 5" fill="none" stroke={mix(colors.leaf, "#fff7a4", 0.12)} strokeWidth="8" strokeLinecap="round" opacity="0.55" />
      {Array.from({ length: 22 }).map((_, dot) => (
        <circle key={dot} cx={-50 + ((dot * 13 + index * 9) % 105)} cy={-8 + ((dot * 17) % 24)} r={1.8 + (dot % 3)} fill={dot % 2 ? colors.bloom : "#fff6a8"} opacity="0.74" />
      ))}
    </g>
  );
}

function PetalCloud({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.56} filter="url(#pigmentBloom)">
      <path d="M-58 4 C-36 -30 29 -37 62 -2 C38 27 -29 35 -58 4Z" fill={mix(colors.bloom, colors.paper, 0.25)} />
      {Array.from({ length: 10 }).map((_, petal) => (
        <ellipse key={petal} cx={-42 + ((petal * 19 + index * 7) % 90)} cy={-11 + ((petal * 13) % 30)} rx="4" ry="8" fill={mix(colors.bloom, "#ffffff", 0.14)} transform={`rotate(${-28 + petal * 9})`} opacity="0.58" />
      ))}
    </g>
  );
}

function WaterLeafMass({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.72}>
      {Array.from({ length: 7 }).map((_, leaf) => (
        <ellipse
          key={leaf}
          cx={-34 + ((leaf * 19 + index * 8) % 76)}
          cy={-12 + ((leaf * 13) % 34)}
          rx={12 + (leaf % 3) * 3}
          ry={7 + (leaf % 2) * 2}
          fill={mix(colors.leaf, colors.water, 0.18)}
          transform={`rotate(${-24 + leaf * 13})`}
          opacity="0.66"
        />
      ))}
      <circle cx="8" cy="-8" r="5" fill={mix(colors.bloom, colors.paper, 0.16)} opacity="0.54" />
    </g>
  );
}

function TallStemMass({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.68}>
      {Array.from({ length: 8 }).map((_, stem) => {
        const x = -30 + stem * 9;
        const height = 42 + ((stem * 11 + index) % 42);
        return (
          <g key={stem}>
            <path d={`M${x} 36 C${x - 8} ${10 - height / 3} ${x + 8} ${8 - height / 2} ${x + 2} ${-height}`} fill="none" stroke={mix(colors.leaf, colors.ink, 0.06)} strokeWidth="1.8" strokeLinecap="round" opacity="0.72" />
            <circle cx={x + 2} cy={-height} r={3 + (stem % 3)} fill={stem % 2 ? colors.bloom : mix(colors.paper, colors.bloom, 0.32)} opacity="0.7" />
          </g>
        );
      })}
    </g>
  );
}

function MistWash({ transform, opacity, colors }) {
  return (
    <g transform={transform} opacity={opacity * 0.46} filter="url(#pigmentBloom)">
      <ellipse rx="72" ry="24" fill={mix(colors.paper, colors.water, 0.26)} />
      <path d="M-61 -2 C-31 -15 18 -17 63 -4" fill="none" stroke="#fffdf2" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
    </g>
  );
}

function BrushWash({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity * 0.72} filter="url(#pigmentBloom)">
      <path
        d="M-42 12 C-25 -18 17 -31 43 -9 C26 20 -12 33 -42 12Z"
        fill={index % 2 ? mix(colors.bloom, colors.paper, 0.28) : mix(colors.water, colors.paper, 0.34)}
        opacity="0.62"
      />
      <path d="M-31 4 C-10 -8 13 -10 35 -1" fill="none" stroke={mix(colors.leaf, colors.paper, 0.12)} strokeWidth="3.2" strokeLinecap="round" opacity="0.52" />
      <path d="M-22 17 C-6 7 10 6 25 12" fill="none" stroke={mix(colors.ink, colors.paper, 0.66)} strokeWidth="1.1" strokeLinecap="round" opacity="0.24" />
    </g>
  );
}

function NameSignatureLayer({ colors, signature }) {
  if (!signature) return null;
  const side = signature.leftWeight === "left" ? -1 : 1;
  const shift = signature.leftWeight === "left" ? 0 : 640;
  const softness = signature.rhythm === "open" ? 0.52 : signature.rhythm === "layered" ? 0.74 : 0.62;

  if (signature.motif === "water") {
    return (
      <g opacity={softness}>
        <path d="M-22 354 C88 301 155 343 244 297 C341 248 454 284 667 212" fill="none" stroke={mix(colors.water, "#ffffff", 0.22)} strokeWidth="26" strokeLinecap="round" />
        <path d="M-18 359 C94 319 166 352 252 308 C348 263 462 294 666 226" fill="none" stroke={mix(colors.water, colors.ink, 0.08)} strokeWidth="7" strokeLinecap="round" opacity="0.44" />
        {[142, 276, 426, 545].map((x, index) => (
          <ellipse key={x} cx={x} cy={326 - (index % 2) * 29} rx={31 + index * 4} ry="9" fill="none" stroke={mix(colors.paper, colors.water, 0.34)} strokeWidth="2" opacity="0.5" />
        ))}
      </g>
    );
  }

  if (signature.motif === "light") {
    return (
      <g opacity={softness * 0.86}>
        {[0, 1, 2, 3, 4].map((ray) => (
          <path
            key={ray}
            d={`M${500 - ray * 18} ${54 + ray * 12} C${438 - ray * 26} ${148 + ray * 11} ${343 - ray * 18} ${210 + ray * 18} ${214 - ray * 34} ${340 - ray * 8}`}
            fill="none"
            stroke={mix(colors.sun, colors.paper, 0.2)}
            strokeWidth={18 - ray * 2}
            strokeLinecap="round"
            opacity={0.18 + ray * 0.04}
          />
        ))}
        <circle cx="516" cy="76" r="58" fill={mix(colors.sun, colors.paper, 0.18)} opacity="0.18" />
      </g>
    );
  }

  if (signature.motif === "moon") {
    return (
      <g opacity={softness}>
        <path d="M51 174 C151 130 223 162 318 126 C411 91 491 118 590 82" fill="none" stroke={mix(colors.paper, colors.water, 0.34)} strokeWidth="18" strokeLinecap="round" opacity="0.42" />
        <path d="M42 236 C167 195 250 223 360 183 C461 147 539 163 636 122" fill="none" stroke={mix(colors.bloom, colors.paper, 0.24)} strokeWidth="12" strokeLinecap="round" opacity="0.24" />
        {[96, 182, 308, 452, 548].map((x, index) => (
          <circle key={x} cx={x} cy={96 + ((index * 31) % 84)} r={2.5 + (index % 2) * 1.8} fill={mix(colors.paper, "#ffffff", 0.1)} opacity="0.68" />
        ))}
      </g>
    );
  }

  if (signature.motif === "blossom") {
    return (
      <g opacity={softness}>
        <path d={`M${shift + side * 18} 122 C${shift + side * -88} 65 ${shift + side * -196} 80 ${shift + side * -292} 142 C${shift + side * -222} 132 ${shift + side * -144} 156 ${shift + side * -74} 198`} fill="none" stroke={mix(colors.ink, colors.paper, 0.28)} strokeWidth="8" strokeLinecap="round" />
        {Array.from({ length: 22 }).map((_, index) => {
          const distance = 56 + ((index * 37) % 286);
          const x = signature.leftWeight === "left" ? distance : 640 - distance;
          const y = 112 + ((index * 29) % 112);
          return <ellipse key={index} cx={x} cy={y} rx="8" ry="14" fill={mix(colors.bloom, colors.paper, 0.2)} opacity="0.44" transform={`rotate(${-35 + index * 11} ${x} ${y})`} />;
        })}
      </g>
    );
  }

  if (signature.motif === "woodland") {
    return (
      <g opacity={softness}>
        <path d="M66 438 C115 383 151 366 199 302 M72 443 C153 403 219 392 287 326 M86 450 C168 429 247 431 337 388" fill="none" stroke={mix(colors.ink, colors.leaf, 0.22)} strokeWidth="9" strokeLinecap="round" opacity="0.36" />
        {[112, 178, 249, 487, 555].map((x, index) => (
          <ellipse key={x} cx={x} cy={286 + (index % 3) * 44} rx="16" ry="38" fill={mix(colors.deepLeaf, colors.paper, 0.08)} opacity="0.38" transform={`rotate(${-38 + index * 19} ${x} ${286 + (index % 3) * 44})`} />
        ))}
      </g>
    );
  }

  if (signature.motif === "path") {
    return (
      <g opacity={softness}>
        <path d="M18 430 C116 366 201 382 282 314 C362 247 444 245 608 152" fill="none" stroke={mix(colors.paper, "#f2dba3", 0.26)} strokeWidth="72" strokeLinecap="round" opacity="0.26" />
        <path d="M26 426 C122 377 207 389 289 326 C372 262 454 258 613 168" fill="none" stroke={mix(colors.ink, colors.paper, 0.62)} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="18 18" opacity="0.32" />
      </g>
    );
  }

  return (
    <g opacity={softness}>
      <path d="M36 382 C118 342 196 362 270 322 C358 276 439 304 612 238" fill="none" stroke={mix(colors.bloom, colors.paper, 0.18)} strokeWidth="18" strokeLinecap="round" opacity="0.28" />
      {Array.from({ length: 34 }).map((_, index) => (
        <circle key={index} cx={42 + ((index * 47) % 560)} cy={246 + ((index * 29) % 164)} r={2 + (index % 4)} fill={index % 2 ? colors.bloom : "#fff6a8"} opacity="0.5" />
      ))}
    </g>
  );
}

function Canopy({ colors }) {
  return (
    <g opacity="0.78">
      <path d="M-28 86 C59 18 149 28 231 64 M394 43 C487 9 578 27 670 73" fill="none" stroke={mix(colors.deepLeaf, colors.ink, 0.08)} strokeWidth="10" strokeLinecap="round" />
      {Array.from({ length: 34 }).map((_, index) => {
        const leftSide = index < 17;
        const x = leftSide ? -4 + index * 15 : 386 + (index - 17) * 17;
        const y = leftSide ? 54 + ((index * 19) % 52) : 37 + ((index * 23) % 55);
        return (
          <ellipse
            key={index}
            cx={x}
            cy={y}
            rx={15 + (index % 4) * 4}
            ry={31 + (index % 3) * 5}
            fill={index % 2 ? mix(colors.leaf, colors.ink, 0.06) : mix(colors.leaf, "#fff6a8", 0.12)}
            transform={`rotate(${leftSide ? -54 + (index % 5) * 10 : 42 - (index % 5) * 8} ${x} ${y})`}
          />
        );
      })}
      {[58, 94, 142, 498, 538, 584].map((x, index) => (
        <circle key={x} cx={x} cy={index < 3 ? 118 + index * 5 : 98 + index * 3} r={4 + (index % 3)} fill={index % 2 ? colors.bloom : mix("#fff6a8", colors.paper, 0.2)} opacity="0.78" />
      ))}
    </g>
  );
}

function mix(a, b, weight = 0.5) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const rgb = ca.map((channel, index) => Math.round(channel * (1 - weight) + cb[index] * weight));
  return `rgb(${rgb.join(", ")})`;
}

function hexToRgb(hex) {
  if (hex.startsWith("rgb")) {
    return hex.match(/\d+/g).slice(0, 3).map(Number);
  }
  const normalized = hex.replace("#", "");
  return [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16));
}

export default GardenArt;
