
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
  public handleKeyboardEvent(e: KeyboardEvent) {}
  public handleMouseEvent(e: MouseEvent) {}

  public internalRender() {
    this.render();

    for (const component of this.components) {
      try {
        this.context.save();
        this.context.translate.apply(this.context, [ component.boundingRect.x, component.boundingRect.y ]);
        component.render();
        this.context.restore();
      } catch (err: any) {
        if (err instanceof Error)
          err.message = 'Component ' + component.constructor.name + ': ' + err.message;
        throw err;
      }
    }
  }

  public internalUpdate(deltaTime: number) {
    this.update(deltaTime);

    for (const component of this.components)
      try {
        component.update(deltaTime);
      } catch (err: any) {
        if (err instanceof Error)
          err.message = 'Component ' + component.constructor.name + ': ' + err.message;
        throw err;
      }
  }

  public render() {}
  public update(deltaTime: number) {}
}