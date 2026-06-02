import React, { forwardRef, useMemo } from "react";

const VIEWBOX = "0 0 640 460";

const GardenArt = forwardRef(function GardenArt({ garden }, ref) {
  const [paper, leaf, bloom, water, ink] = garden.palette;
  const accents = useMemo(
    () => ({
      paper,
      leaf,
      bloom,
      water,
      ink,
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
      role="img"
      aria-label={garden.gardenTitle}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="watercolor" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />
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
      </defs>

      <rect width="640" height="460" rx="34" fill="url(#gardenWash)" />
      <g filter="url(#watercolor)" opacity="0.95">
        <path d="M55 390 C132 318 210 332 285 247 C346 179 432 210 585 84" fill="none" stroke={accents.path} strokeWidth="42" strokeLinecap="round" opacity="0.54" />
        <path d="M56 392 C135 326 210 338 292 252 C353 188 440 214 586 89" fill="none" stroke={mix(paper, accents.path, 0.45)} strokeWidth="22" strokeLinecap="round" opacity="0.7" />
        <ellipse cx="497" cy="319" rx="78" ry="45" fill="url(#pondGradient)" opacity="0.78" />
        <ellipse cx="500" cy="317" rx="53" ry="24" fill="none" stroke={mix(paper, water, 0.45)} strokeWidth="5" opacity="0.8" />
        <g opacity="0.46">
          {Array.from({ length: 16 }).map((_, index) => (
            <circle
              key={index}
              cx={42 + ((index * 71) % 560)}
              cy={42 + ((index * 43) % 350)}
              r={8 + (index % 4) * 5}
              fill={index % 2 ? mix(leaf, paper, 0.35) : mix(water, paper, 0.55)}
            />
          ))}
        </g>

        {garden.placements.map((item, index) => (
          <GardenElement key={`${item.kind}-${index}`} item={item} index={index} colors={accents} garden={garden} />
        ))}

        <FrameVines colors={accents} />
      </g>
    </svg>
  );
});

function GardenElement({ item, index, colors, garden }) {
  const transform = `translate(${item.x} ${item.y}) rotate(${item.rotate}) scale(${item.scale})`;
  const common = { transform, opacity: item.opacity };
  if (item.kind === "flower") return <Flower {...common} colors={colors} index={index} label={garden.elements.primaryFlower} />;
  if (item.kind === "plant") return <Plant {...common} colors={colors} index={index} />;
  if (item.kind === "stone") return <Stone {...common} colors={colors} index={index} />;
  if (item.kind === "crystal") return <Crystal {...common} colors={colors} index={index} />;
  if (item.kind === "feature") return <Feature {...common} colors={colors} index={index} feature={garden.elements.feature} />;
  return <Charm {...common} colors={colors} index={index} />;
}

function Flower({ transform, opacity, colors, index, label }) {
  const petalCount = label?.includes("lily") || label?.includes("iris") ? 5 : 7;
  return (
    <g transform={transform} opacity={opacity}>
      <path d="M0 8 C-3 31 -7 49 -12 70" stroke={colors.deepLeaf} strokeWidth="5" fill="none" strokeLinecap="round" />
      <ellipse cx="-12" cy="38" rx="8" ry="18" fill={colors.leaf} transform="rotate(-32 -12 38)" />
      <ellipse cx="8" cy="49" rx="8" ry="18" fill={mix(colors.leaf, colors.paper, 0.25)} transform="rotate(34 8 49)" />
      {Array.from({ length: petalCount }).map((_, petal) => {
        const angle = (360 / petalCount) * petal + index * 6;
        return (
          <ellipse
            key={petal}
            cx="0"
            cy="-13"
            rx="10"
            ry="22"
            fill={petal % 2 ? colors.bloom : mix(colors.bloom, colors.paper, 0.28)}
            stroke={mix(colors.bloom, colors.ink, 0.18)}
            strokeWidth="1.4"
            transform={`rotate(${angle})`}
          />
        );
      })}
      <circle r="9" fill={mix(colors.glow, colors.ink, 0.08)} stroke={mix(colors.ink, colors.bloom, 0.3)} strokeWidth="1.4" />
    </g>
  );
}

function Plant({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity}>
      <path d="M0 62 C-8 40 -4 20 0 0 C9 24 12 43 0 62Z" fill={mix(colors.leaf, colors.paper, 0.1)} stroke={colors.deepLeaf} strokeWidth="1.8" />
      <path d="M2 60 C28 42 29 20 18 3 C12 28 7 43 2 60Z" fill={colors.leaf} stroke={colors.deepLeaf} strokeWidth="1.8" />
      <path d="M-3 62 C-29 48 -31 27 -20 10 C-13 32 -8 47 -3 62Z" fill={mix(colors.leaf, colors.water, 0.22)} stroke={colors.deepLeaf} strokeWidth="1.8" />
      {index % 2 === 0 && <circle cx="18" cy="6" r="5" fill={colors.bloom} opacity="0.82" />}
    </g>
  );
}

function Stone({ transform, opacity, colors, index }) {
  return (
    <g transform={transform} opacity={opacity}>
      <path
        d="M-27 12 C-25 -11 -2 -21 22 -13 C42 -6 39 20 18 29 C-8 38 -31 31 -27 12Z"
        fill={index % 2 ? mix(colors.ink, colors.paper, 0.45) : mix(colors.path, colors.ink, 0.2)}
        stroke={mix(colors.ink, colors.paper, 0.15)}
        strokeWidth="2"
      />
      <path d="M-12 -4 C0 -12 18 -7 24 5" fill="none" stroke={mix(colors.paper, colors.ink, 0.35)} strokeWidth="2" opacity="0.7" />
    </g>
  );
}

function Crystal({ transform, opacity, colors, index }) {
  const fill = index % 2 ? mix(colors.water, colors.paper, 0.25) : mix(colors.bloom, colors.water, 0.36);
  return (
    <g transform={transform} opacity={opacity}>
      <path d="M0 -38 L20 -8 L10 35 L-9 35 L-20 -8Z" fill={fill} stroke={mix(colors.ink, fill, 0.35)} strokeWidth="2" />
      <path d="M0 -38 L0 35 M-20 -8 L20 -8 M0 -38 L10 -8 L0 35" fill="none" stroke={mix(colors.paper, fill, 0.55)} strokeWidth="1.6" opacity="0.8" />
      <ellipse cx="0" cy="39" rx="24" ry="6" fill={mix(colors.ink, colors.paper, 0.28)} opacity="0.22" />
    </g>
  );
}

function Feature({ transform, opacity, colors, feature }) {
  const isWater = feature?.includes("pond") || feature?.includes("pool") || feature?.includes("dew");
  return (
    <g transform={transform} opacity={opacity}>
      {isWater ? (
        <>
          <ellipse rx="38" ry="21" fill={mix(colors.water, colors.paper, 0.35)} stroke={mix(colors.water, colors.ink, 0.18)} strokeWidth="2" />
          <path d="M-22 0 C-8 -8 11 -8 25 0" fill="none" stroke={colors.paper} strokeWidth="3" opacity="0.65" />
        </>
      ) : (
        <>
          <path d="M-38 20 C-18 -4 12 -18 39 -6 C24 22 -5 32 -38 20Z" fill={mix(colors.leaf, colors.paper, 0.28)} stroke={colors.deepLeaf} strokeWidth="2" />
          <circle cx="-15" cy="3" r="5" fill={colors.glow} opacity="0.78" />
          <circle cx="8" cy="-6" r="4" fill={colors.glow} opacity="0.65" />
          <circle cx="25" cy="1" r="3.5" fill={colors.glow} opacity="0.62" />
        </>
      )}
    </g>
  );
}

function Charm({ transform, opacity, colors }) {
  return (
    <g transform={transform} opacity={opacity}>
      <path d="M0 -27 C18 -20 25 -5 20 12 C14 30 -14 31 -21 12 C-27 -5 -18 -20 0 -27Z" fill={mix(colors.glow, colors.paper, 0.26)} stroke={mix(colors.ink, colors.glow, 0.28)} strokeWidth="2" />
      <path d="M-9 -4 C-1 -12 10 -12 12 0 C10 10 -1 15 -10 7" fill="none" stroke={mix(colors.ink, colors.bloom, 0.32)} strokeWidth="3" strokeLinecap="round" />
      <circle cy="-31" r="5" fill={colors.paper} stroke={mix(colors.ink, colors.paper, 0.1)} strokeWidth="2" />
    </g>
  );
}

function FrameVines({ colors }) {
  return (
    <g opacity="0.55">
      <path d="M42 74 C96 35 146 39 190 67 M447 395 C506 426 558 413 598 371" fill="none" stroke={colors.deepLeaf} strokeWidth="5" strokeLinecap="round" />
      {[80, 118, 156, 485, 526, 565].map((x, index) => (
        <ellipse
          key={x}
          cx={x}
          cy={index < 3 ? 55 + index * 4 : 407 - (index - 3) * 6}
          rx="8"
          ry="17"
          fill={index % 2 ? colors.leaf : mix(colors.leaf, colors.paper, 0.24)}
          transform={`rotate(${index < 3 ? -42 : 42} ${x} ${index < 3 ? 55 + index * 4 : 407 - (index - 3) * 6})`}
        />
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
  const normalized = hex.replace("#", "");
  return [0, 2, 4].map((index) => parseInt(normalized.slice(index, index + 2), 16));
}

export default GardenArt;
