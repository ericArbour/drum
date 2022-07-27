import './style.css';
import { setupCanvas } from './canvas';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main id="main">
    <h1>Drum</h1>
    <article>
      <h2>Canvas</h2>
      <canvas id="canvas"></canvas>
      <button id="play-note-button">Play Note</button>
      <aside>
        <h3>WebMIDI Support</h3>
        <p id="web-midi-support">Checking if WebMIDI is supported...</p>
      </aside>
      <aside>
        <h3>Pointer Report</h3>
        <p id="pointer-report">Click canvas above to begin.</p>
      </aside>
    </article>
  </div>
`;

setupCanvas(
  document.querySelector<HTMLCanvasElement>('#canvas')!,
  document.querySelector<HTMLParagraphElement>('#pointer-report')!,
  document.querySelector<HTMLParagraphElement>('#web-midi-support')!,
  document.querySelector<HTMLButtonElement>('#play-note-button')!
);
