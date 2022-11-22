import { MoveableSizeableAttribute } from 'utils/types/moveablesizeableattr';

export default class BaseComponent {
  public boundingRect: MoveableSizeableAttribute = { x: 0, y: 0, w: 0, h: 0 };
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  public assign(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;

    this.mounted();
  }

  public mounted() {
    this.boundingRect.w = this.canvas.width;
    this.boundingRect.h = this.canvas.height;
  }

  public render() {
    this.context.fillStyle = 'white';
    this.context.font = '16px sans-serif';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('[base component]', this.boundingRect.w / 2, this.boundingRect.h / 2);
  }

  public update(deltaTime: number) {}
};