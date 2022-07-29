export function setupCanvas(
  canvasElement: HTMLCanvasElement,
  pointerReportElement: HTMLParagraphElement
) {
  function drawCircles(pointerPos?: Position) {
    const ringCount = 16;
    const { height, width } = canvasElement;
    const minDim = Math.min(height, width);
    const circleRadius = Math.floor(minDim / (ringCount * 2));
    const center: Position = {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2),
    };
    const pointerDist = pointerPos ? getDistance(pointerPos, center) : null;

    const ctx = canvasElement.getContext('2d')!;
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    for (let i = ringCount; i >= 0; i--) {
      const currentRadius = circleRadius * i;
      ctx.beginPath();
      ctx.arc(center.x, center.y, currentRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'blue';
      const isPointerInCircle = pointerDist
        ? pointerDist >= currentRadius - (circleRadius + 2) // + 2 for borders
        : false;
      if (isPointerInCircle) ctx.fill();
    }
  }

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
  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false);

  const handlePointerDown = (e: PointerEvent) => {
    const pos = getCursorPosition(canvasElement, e);
    drawCircles(pos);

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

interface Position {
  x: number;
  y: number;
}

function getCursorPosition(element: HTMLElement, event: MouseEvent): Position {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
}

function getDistance(pos1: Position, pos2: Position) {
  let a = pos2.x - pos1.x;
  let b = pos2.y - pos1.y;

  return Math.sqrt(a * a + b * b);
}
