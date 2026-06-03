# GardenByte

GardenByte is a cozy React/Vite web toy that turns a first name, name meaning, or personal association into a symbolic watercolor-pixel garden. It maps origin, meaning, mood, season, time of day, and optional self-defined memories into flowers, crystals, stones, charms, biomes, and a downloadable garden image.

## Live Demo

https://gardenbyte.vercel.app/

## What Makes It Different

GardenByte is designed to feel less like a one-click generator and more like a tiny Nintendo DS-inspired creative tool. Users can grow a garden, click glowing symbols inside the artwork, discover hidden meanings, save gardens to a local journal, unlock small achievements, and export the result for social posts, wallpapers, GitHub banners, or documentation.

## Features

- Generate a personalized garden from a first name
- Choose mood, palette, season, time of day, scene, intensity, and visual style
- Use **Personal Meaning Mode** to grow a garden from words, memories, and keepsakes instead of etymology alone
- Click glowing garden markers to reveal hidden symbol notes
- Save generated gardens to a local Garden Journal
- Unlock achievement stamps such as First Bloom, Moon Gardener, Archivist, Botanist, Crystal Keeper, and Personal Myth
- Copy captions, name notes, alt text, GitHub markdown, JSON seeds, and share URLs
- Download PNG crops for profile images, phone wallpapers, desktop wallpapers, and README banners
- Download the live SVG artwork for crisp scaling
- Toggle garden layers in Custom Studio mode
- Lock controls and regenerate only unlocked settings
- Uses local storage for journal entries and discovered symbols
- Includes reduced-motion support and keyboard-accessible SVG hotspots

## Meaning System

The project uses a local symbolic name dataset and labels each result with a source confidence level:

- **Medium confidence**: generated from the starter name dataset
- **Personal meaning**: generated from user-provided associations
- **Interpretive**: generated from name sound, length, syllable rhythm, mood, and symbolic mappings when a name is not in the dataset yet

Name meanings vary across cultures and sources, so GardenByte treats etymology as inspiration rather than a single definitive truth.

## Tech Stack

- React
- Vite
- CSS
- SVG-generated garden artwork
- Local storage
- Deterministic seeded generation

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Vercel Settings

- Framework Preset: Vite
- Root Directory: `./`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: none required

## Suggested GitHub Topics

```text
react
vite
svg
generative-art
creative-coding
web-toy
name-meaning
watercolor
pixel-art
frontend
```

## Future Ideas

- Add a larger sourced name dataset
- Add animated watercolor growth transitions
- Add optional sound packs
- Add social-card image templates with embedded name lore
- Add a public gallery mode backed by Supabase or Firebase
