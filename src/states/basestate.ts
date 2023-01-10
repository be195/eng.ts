
import BaseComponent from '@/components/basecomponent';

const DEFAULT_COMPONENT = new BaseComponent();

export class BaseState extends BaseComponent {
  public get components(): BaseComponent[] {
    return [ DEFAULT_COMPONENT ];
  }

  public render() {}

  /* @internal */
  public internalMounted(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, parent?: BaseComponent) {
    this.canvas = canvas;
    this.context = context;
    this.parent = parent;

    this.components.forEach(component =>
      component.internalMounted(
        this.canvas as HTMLCanvasElement,
        this.context as CanvasRenderingContext2D,
        this
      )
    );

    this.boundingRect.w = this.canvas.width;
    this.boundingRect.h = this.canvas.height;

    this.mounted();
  }

  public mounted() {}
}