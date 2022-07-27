export function setupCanvas(
  canvasElement: HTMLCanvasElement,
  pointerReportElement: HTMLParagraphElement,
  webMidiSupportElement: HTMLParagraphElement,
  playNoteButtonElement: HTMLButtonElement
) {
  let midi: WebMidi.MIDIAccess | null = null;
  let firstOutputPort: string | null = null;
  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  function resizeCanvas() {
    const fontSizePx = parseFloat(
      window.getComputedStyle(document.body).getPropertyValue('font-size')
    );
    const mainWidth = document.getElementById('main')!.clientWidth;
    const padding2rem = fontSizePx * 2;

    canvasElement.width = mainWidth;
    canvasElement.height = window.innerHeight - padding2rem * 2;

    drawCircles();
  }

  resizeCanvas();

  function drawCircles() {
    const { height, width } = canvasElement;
    const minDim = Math.min(height, width);
    const circleRadius = Math.floor(minDim / 256);
    const center = [Math.floor(width / 2), Math.floor(height / 2)] as const;

    const ctx = canvasElement.getContext('2d')!;

    for (let i = 1; i <= 128; i++) {
      ctx.beginPath();
      ctx.arc(...center, circleRadius * i, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  const handlePointerDown = (e: PointerEvent) => {
    console.log(e);
    pointerReportElement.innerHTML = `
      <h4>Pointer Event Properties</h4>
      <ul>
        <li>Pointer ID: ${e.pointerId}</li>
        <li>Height: ${e.height}</li>
        <li>Width: ${e.width}</li>
        <li>Pressure: ${e.pressure}</li>
        <li>Tangential Pressure: ${e.tangentialPressure}</li>
        <li>Tilt X: ${e.tiltX}</li>
        <li>Tilt Y: ${e.tiltY}</li>
        <li>Twist: ${e.twist}</li>
        <li>Pointer Type: ${e.pointerType}</li>
        <li>Is Primary: ${e.isPrimary}</li>
      </ul>
      <h4>Mouse Event Properties</h4>
      <ul>
        <li>Client X: ${e.clientX}</li>
        <li>Client Y: ${e.clientY}</li>
      </ul>
      <h4>Event Properties</h4>
      <ul>
        <li>Type: ${e.type}</li>
      </ul>
    `;
  };
  canvasElement.addEventListener('pointerdown', handlePointerDown);

  function onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {
    console.log('MIDI ready!');
    webMidiSupportElement.innerHTML = 'Web MIDI is supported!';
    midi = midiAccess;
    listInputsAndOutputs(midiAccess);
  }

  function onMIDIFailure(msg: string) {
    console.log(`Failed to get MIDI access - ${msg}`);
    webMidiSupportElement.innerHTML = 'Web MIDI is not supported :(';
  }

  function listInputsAndOutputs(midiAccess: WebMidi.MIDIAccess) {
    console.log(`Number of MIDI inputs: ${[...midiAccess.inputs].length}`);
    for (const entry of midiAccess.inputs) {
      const input = entry[1];
      console.log(
        `Input port [type:'${input.type}']` +
          ` id:'${input.id}'` +
          ` manufacturer:'${input.manufacturer}'` +
          ` name:'${input.name}'` +
          ` version:'${input.version}'`
      );
    }

    console.log(`Number of MIDI outputs: ${[...midiAccess.outputs].length}`);
    for (const entry of midiAccess.outputs) {
      const output = entry[1];
      if (!firstOutputPort) firstOutputPort = output.id;
      console.log(
        `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
      );
    }
  }

  function handleClick() {
    if (!midi || !firstOutputPort) return;
    var noteOnMessage = [0x90, 60, 0x7f]; // note on, middle C, full velocity
    var output = midi.outputs.get(firstOutputPort);
    if (!output) return;
    output.send(noteOnMessage); //omitting the timestamp means send immediately.
    output.send([0x80, 60, 0x40], window.performance.now() + 1000.0); // Inlined array creation- note off, middle C,
    // release velocity = 64, timestamp = now + 1000ms.
  }

  playNoteButtonElement.addEventListener('click', handleClick);

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}
