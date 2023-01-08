
import BaseComponent from '@/components/basecomponent';

const DEFAULT_COMPONENT = new BaseComponent();

export class BaseState extends BaseComponent {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  public get components(): BaseComponent[] {
    return [ DEFAULT_COMPONENT ];
  }

  public render() {
    this.context.fillStyle = 'white';
    this.context.font = '16px sans-serif';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('[base state]', this.boundingRect.w / 2, this.boundingRect.h / 2);
  }

  /* @internal */
  public internalMounted(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, parent?: BaseComponent) {
    this.canvas = canvas;
    this.context = context;
    this.parent = parent;

    this.components.forEach(component =>
      component.internalMounted(this.canvas, this.context, this)
    );

    this.boundingRect.w = this.canvas.width;
    this.boundingRect.h = this.canvas.height;

    this.mounted();
  }

  public mounted() {}
}