export default class BaseComponent {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  public assign(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;
  }

  public render(width: number, height: number) {
    this.context.fillStyle = 'white';
    this.context.font = '16px sans-serif';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('[base component]', width / 2, height / 2);
  }

  public update(deltaTime: number) {}
};