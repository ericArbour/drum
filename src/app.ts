import './style.css';
import { setupCanvas } from './setup-canvas';
import { setupMidi } from './setup-midi';
import { setupMidiInputs } from './setup-midi-inputs';
import { setupMidiOutputs } from './setup-midi-outputs';
import { setupPlayButton } from './setup-play-button';

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
        <h3>WebMIDI Inputs:</h3>
        <ul id="midi-inputs"></ul>
        <h3>WebMIDI Outputs:</h3>
        <ul id="midi-outputs"></ul>
      </aside>
      <aside>
        <h3>Pointer Report</h3>
        <p id="pointer-report">Click canvas above to begin.</p>
      </aside>
    </article>
  </div>
`;

setupMidi(
  document.querySelector<HTMLParagraphElement>('#web-midi-support')!,
  (midiAccess) => {
    if (midiAccess) {
      setupMidiInputs(
        midiAccess,
        document.querySelector<HTMLUListElement>('#midi-inputs')!
      );
      const firstOutput = setupMidiOutputs(
        midiAccess,
        document.querySelector<HTMLUListElement>('#midi-outputs')!
      );
      setupPlayButton(
        firstOutput,
        document.querySelector<HTMLButtonElement>('#play-note-button')!
      );
    }

    setupCanvas(
      document.querySelector<HTMLCanvasElement>('#canvas')!,
      document.querySelector<HTMLParagraphElement>('#pointer-report')!
    );
  }
);
