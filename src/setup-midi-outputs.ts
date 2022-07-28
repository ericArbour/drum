export function setupMidiOutputs(
  midiAccess: WebMidi.MIDIAccess,
  listElement: HTMLUListElement
) {
  const outputs = [...midiAccess.outputs.values()];
  const listElements = outputs.map(
    (input) =>
      `<li>type: ${input.type},` +
      ` id: ${input.id},` +
      ` manufacturer: ${input.manufacturer},` +
      ` name: ${input.name},` +
      ` version: ${input.version},` +
      ` connection: ${input.connection},` +
      ` state : ${input.state}</li>`
  );
  listElement.innerHTML = listElements.join('\n');

  const firstOutput = outputs[0];
  return firstOutput;
}
