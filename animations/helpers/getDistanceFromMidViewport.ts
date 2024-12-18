export const getDistanceFromMidViewport = (element: HTMLElement): [x: number, y: number] => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  
  const { x, y, width, height }: DOMRect = element.getBoundingClientRect();

  const yCenter = y + height / 2;
  const xCenter = x + width / 2;

  const distY = vh / 2 - yCenter;
  const distX = vw / 2 - xCenter;

  return [distX, distY]
}