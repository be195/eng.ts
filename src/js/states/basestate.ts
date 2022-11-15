import BaseComponent from '../components/basecomponent';

const DEFAULT_COMPONENT = new BaseComponent();

export class BaseState {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.context = context;

    this.components.forEach(component => component.assign(canvas, context));
  }

  get components(): BaseComponent[] {
    return [ DEFAULT_COMPONENT ];
  }

  public render() {
    const { width, height } = this.canvas;

    for (const component of this.components)
      component.render(width, height);
  }

  public update(deltaTime: number) {
    for (const component of this.components)
      component.update(deltaTime);
  }
}