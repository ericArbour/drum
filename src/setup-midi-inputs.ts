export function setupMidiInputs(
  midiAccess: WebMidi.MIDIAccess,
  listElement: HTMLUListElement
) {
  const listElements = [...midiAccess.inputs.values()].map(
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
}
