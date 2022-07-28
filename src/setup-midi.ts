export function setupMidi(
  webMidiSupportElement: HTMLParagraphElement,
  onMidiRequest: (midiAccess: WebMidi.MIDIAccess | null) => void
) {
  function onMidiSuccess(midiAccess: WebMidi.MIDIAccess) {
    webMidiSupportElement.innerHTML = 'Web MIDI is supported!';
    onMidiRequest(midiAccess);
  }

  function onMidiFailure(msg: string) {
    webMidiSupportElement.innerHTML = `Web MIDI is not supported. ${msg}`;
    onMidiRequest(null);
  }

  navigator.requestMIDIAccess().then(onMidiSuccess, onMidiFailure);
}
