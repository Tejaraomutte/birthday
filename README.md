# A Little Birthday Universe 💗

A responsive React + Vite birthday surprise website with a photo gallery, birthday letter, quiz, countdown, and interactive gift reveal.

## Run locally

Install Node.js, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Personalize

Update `birthdayConfig` and `defaultMemories` near the top of `src/main.jsx` to change the birthday details, messages, captions, and bundled gallery photos. The hero frame uses `DSC_1400.JPG`; the gallery also includes the other images in the project root.

Visitors can open **Our memory gallery** to browse all bundled photos. The **Add photos & videos** control previews additional local files in the current browser session; those files are not uploaded to a server and disappear when the page is refreshed.

## Build

```bash
npm run build
```

The production output is written to `dist/`. This is a front-end-only app and does not require a backend.

## Privacy

The bundled family photos are part of this repository. Anyone who can access the repository or a deployment containing these assets may be able to view them. Keep the repository private if the photos should not be public.
