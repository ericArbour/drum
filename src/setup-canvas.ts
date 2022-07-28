export function setupCanvas(
  canvasElement: HTMLCanvasElement,
  pointerReportElement: HTMLParagraphElement
) {
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
}
