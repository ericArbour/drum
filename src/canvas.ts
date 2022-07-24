export function setupCanvas(
  canvasElement: HTMLCanvasElement,
  pointerReportElement: HTMLParagraphElement
) {
  const handleClick = (e: PointerEvent) => {
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
  canvasElement.addEventListener('pointerdown', handleClick);
}
