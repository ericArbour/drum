export function setupPlayButton(
  output: WebMidi.MIDIOutput | undefined,
  buttonElement: HTMLButtonElement
) {
  function handleClick() {
    const noteOnMessage = [0x90, 70, 0x7f]; // note on, middle C, full velocity
    if (!output) return;
    output.send(noteOnMessage); //omitting the timestamp means send immediately.
    output.send([0x80, 60, 0x40], window.performance.now() + 1000.0); // Inlined array creation- note off, middle C,
    // release velocity = 64, timestamp = now + 1000ms.
  }

  buttonElement.addEventListener('click', handleClick);
}
