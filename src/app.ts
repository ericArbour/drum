import './style.css';
import { setupCanvas } from './canvas';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <main>
    <h1>Drum</h1>
    <article>
      <h2>Canvas</h2>
      <canvas id="canvas"></canvas>
      <aside>
        <h3>Pointer Report</h3>
        <p id="pointer-report">Click canvas above to begin.</p>
      </aside>
    </article>
  </div>
`;

setupCanvas(
  document.querySelector<HTMLCanvasElement>('#canvas')!,
  document.querySelector<HTMLParagraphElement>('#pointer-report')!
);
