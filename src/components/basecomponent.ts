import { EventEmitter } from '@/utils/events';
import { MoveableAttribute, MoveableSizeableAttribute } from '@/utils/types/moveablesizeableattr';

export default class BaseComponent extends EventEmitter {
  public boundingRect: MoveableSizeableAttribute = { x: 0, y: 0, w: 0, h: 0 };
  public canvas?: HTMLCanvasElement;
  public context?: CanvasRenderingContext2D;
  public parent: BaseComponent;

  public get components(): BaseComponent[] {
    return [];
  }

  /* @internal */
  public internalRender() {
    if (!this.context || !this.canvas) return;
    this.render();

    for (const component of this.components) {
      try {
        this.context.save();
        this.context.translate.apply(this.context, [ component.boundingRect.x, component.boundingRect.y ]);
        component.internalRender();
        this.context.restore();
      } catch (err: any) {
        if (err instanceof Error)
          err.message = 'Component ' + component.constructor.name + ': ' + err.message;
        throw err;
      }
    }
  }

  /* @internal */
  public internalUpdate(deltaTime: number) {
    this.update(deltaTime);

    for (const component of this.components)
      try {
        component.internalUpdate(deltaTime);
      } catch (err: any) {
        if (err instanceof Error)
          err.message = 'Component ' + component.constructor.name + ': ' + err.message;
        throw err;
      }
  }

  /* @internal */
  public internalMounted(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, parent?: BaseComponent) {
    this.canvas = canvas;
    this.context = context;
    this.parent = parent;

    this.components.forEach(component =>
      component.internalMounted(this.canvas, this.context, this)
    );

    this.mounted();
  }

  /* @internal */
  public internalDestroy() {
    this.canvas = undefined;
    this.context = undefined;
    this.parent = undefined;

    this.components.forEach(component =>
      component.internalDestroy()
    );

    this.destroy();
  }

  public internalHandleMouseEvent(e: MouseEvent, relativePos: MoveableAttribute) {
    relativePos.x -= this.boundingRect.x;
    relativePos.y -= this.boundingRect.y;

    for (const component of this.components) {
      const { x, y, w, h } = component.boundingRect;
      if (relativePos.x >= x && relativePos.y >= y && relativePos.x < (x + w) && relativePos.y < (y + h))
        return component.internalHandleMouseEvent(e, relativePos);
    }

    return this.handleMouseEvent(e, relativePos);
  }

  public render() {
    this.context.fillStyle = 'white';
    this.context.font = '16px sans-serif';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('[base component]', this.boundingRect.w / 2, this.boundingRect.h / 2);
  }

  public handleKeyboardEvent(e: KeyboardEvent) {}
  public handleMouseEvent(e: MouseEvent, relativePos: MoveableAttribute) {}
  public mounted() {}
  public destroy() {}
  public update(deltaTime: number) {}
};