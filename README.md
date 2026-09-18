# آتلیه هنر — Art Gallery Marketplace

A minimal, luxurious e-commerce platform for handmade art, pottery, sculpture
and jewelry — built with Next.js 14 (App Router), TypeScript, Tailwind CSS,
Framer Motion and shadcn-style primitives. Persian (Farsi) RTL throughout.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Notes

- All data is local mock JSON under `/data` — no backend required.
- The four reference paintings (Starry Night, The Scream, Girl with a Pearl
  Earring, Mona Lisa) are all public domain. Rather than embedding external
  image files, their presence across the site is expressed through original
  CSS gradient compositions (`.art-starry-night`, `.art-the-scream`,
  `.art-girl-pearl`, `.art-mona-lisa` in `app/globals.css`) that evoke each
  work's palette and mood — swap these for real cropped photographs in
  `/public/paintings` at any time; the classes are drop-in replaceable with
  `background-image` rules once you have licensed/downloaded image assets.
- Checkout has no live payment gateway — it's a placeholder per spec.
