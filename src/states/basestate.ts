import BaseComponent from '@/components/basecomponent';

const DEFAULT_COMPONENT = new BaseComponent();

export class BaseState {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;

    this.components.forEach(component => component.assign(canvas, context));
  }

  public get components(): BaseComponent[] {
    return [ DEFAULT_COMPONENT ];
  }

  public mounted() {}

  public internalRender() {
    this.render();

    for (const component of this.components) {
      this.context.save();
      this.context.translate.apply(this.context, [ component.boundingRect.x, component.boundingRect.y ]);
      component.render();
      this.context.restore();
    }
  }

  public internalUpdate(deltaTime: number) {
    this.update(deltaTime);

    for (const component of this.components)
      component.update(deltaTime);
  }

  public render() {}
  public update(deltaTime: number) {}
}