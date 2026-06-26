# AlgoScope

An oscilloscope-styled visualizer for classic sorting algorithms, built with React. Comparisons, swaps, and writes trace across the display in real time, like a signal on a scope readout.

> Live demo: _add your deployed link here (Vercel / Netlify / GitHub Pages)_

## Why this exists

Most sorting visualizers are bar charts with a swap animation bolted on. AlgoScope is built around a single playback engine: every algorithm is implemented as a JavaScript generator that yields a snapshot of the array after each comparison or write. The UI just steps through whichever generator is selected — so adding a new algorithm means writing the algorithm, not a new animation system.

## Features

- **5 algorithms**: Bubble, Selection, Insertion, Merge, and Quick Sort
- **Live stats**: comparison count, write count, elapsed time, and status, updated every step
- **Same-data comparison**: re-run a different algorithm on the exact same array to compare behavior
- **Adjustable array size and playback speed**
- **Hand-built animation** — no charting library, just CSS transitions driven by React state
- Respects `prefers-reduced-motion`, keyboard-accessible controls

## Tech stack

- React 18
- Vite
- Plain CSS (custom properties for the design tokens, no framework)

## Algorithms implemented

| Algorithm      | Best        | Average     | Worst       | Space     |
|----------------|-------------|-------------|-------------|-----------|
| Bubble Sort    | O(n)        | O(n²)       | O(n²)       | O(1)      |
| Selection Sort | O(n²)       | O(n²)       | O(n²)       | O(1)      |
| Insertion Sort | O(n)        | O(n²)       | O(n²)       | O(1)      |
| Merge Sort     | O(n log n)  | O(n log n)  | O(n log n)  | O(n)      |
| Quick Sort     | O(n log n)  | O(n log n)  | O(n²)       | O(log n)  |

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  algorithms/
    sortingAlgorithms.js   # generator-based implementations of each algorithm
    algoInfo.js             # complexity + description metadata
  components/
    Header.jsx
    Controls.jsx
    Visualizer.jsx
    Panels.jsx               # StatsPanel + InfoPanel
  App.jsx                    # state management + playback engine
  index.css                  # design tokens and styles
```

## What I'd add next

- Step-back / scrub through history
- Additional algorithms (heap sort, radix sort)
- Shareable permalink for a given array + algorithm seed

## License

MIT
