import { EventEmitter } from 'events';
import { MoveableAttribute, MoveableSizeableAttribute } from '@/utils/types/moveablesizeableattr';
import container from '@/container';

export default class BaseComponent extends EventEmitter {
  public boundingRect: MoveableSizeableAttribute = { x: 0, y: 0, w: 0, h: 0 };
  public parent?: BaseComponent;
  public stats?: Stats.Panel;

  public get components(): BaseComponent[] {
    return [];
  }

  /* @internal */
  public internalRender() {
    if (!container.context || !container.canvas)
      throw new Error('internalRender called with no viewport assigned in container');
    const previous = performance.now();
    this.render();

    for (const component of this.components) {
      try {
        container.context.save();
        container.context.translate.apply(container.context, [ component.boundingRect.x, component.boundingRect.y ]);
        component.internalRender();
        container.context.restore();
      } catch (err) {
        console.error('Component', component.constructor.name, 'has spew a render error!');
        throw err;
      }
    }

    this.stats?.update(performance.now() - previous, 1000 / 144);
  }

  /* @internal */
  public internalUpdate(deltaTime: number) {
    this.update(deltaTime);

    for (const component of this.components)
      try {
        component.internalUpdate(deltaTime);
      } catch (err) {
        console.error('Component', component.constructor.name, 'has spew an update error!');
        throw err;
      }
  }

  /* @internal */
  public internalMounted(parent?: BaseComponent) {
    if (window.Stats !== undefined) {
      this.stats = new window.Stats.Panel(this.constructor.name, '#fff', '#000');
      container.profilerContainer.append(this.stats.dom);
    }
    this.parent = parent;

    this.components.forEach(component =>
      component.internalMounted(this)
    );

    this.mounted();
  }

  /* @internal */
  public internalDestroy() {
    if (this.stats)
      container.profilerContainer.removeChild(this.stats.dom);
    this.parent = undefined;

    this.components.forEach(component =>
      component.internalDestroy()
    );

    this.destroy();
  }

  public internalHandleMouseEvent(e: MouseEvent, relativePos: MoveableAttribute): void {
    relativePos.x -= this.boundingRect.x;
    relativePos.y -= this.boundingRect.y;

    for (let i = this.components.length - 1; i >= 0; i--) {
      const component = this.components[i];
      const { x, y, w, h } = component.boundingRect;
      if (relativePos.x >= x && relativePos.y >= y && relativePos.x < (x + w) && relativePos.y < (y + h))
        return component.internalHandleMouseEvent(e, relativePos);
    }

    return this.handleMouseEvent(e, relativePos);
  }

  public render() {
    if (!container.context) return;
    container.context.fillStyle = 'white';
    container.context.font = '16px sans-serif';
    container.context.textAlign = 'center';
    container.context.textBaseline = 'middle';
    container.context.fillText('[base component]', this.boundingRect.w / 2, this.boundingRect.h / 2);
  }

  public mouseEnter() {}
  public mouseLeave() {}
  public handleKeyboardEvent(e: KeyboardEvent) {}
  public handleMouseEvent(e: MouseEvent, relativePos: MoveableAttribute) {}
  public mounted() {}
  public destroy() {}
  public update(deltaTime: number) {}
};