
import BaseComponent from '@/components/basecomponent';
import container from '@/container';
import { MoveableAttribute } from '@/utils/types/moveablesizeableattr';

const DEFAULT_COMPONENT = new BaseComponent();

export class BaseState extends BaseComponent {
  public get components(): BaseComponent[] {
    return [ DEFAULT_COMPONENT ];
  }

  public render() {}

  /* @internal */
  public internalMounted() {
    if (!container.canvas)
      throw new Error('internalMounted called with no viewport assigned in container');

    this.components.forEach(component =>
      component.internalMounted(this)
    );

    this.boundingRect.w = container.canvas.width;
    this.boundingRect.h = container.canvas.height;

    this.mounted();
  }

  public internalHandleMouseEvent(e: MouseEvent, relativePos: MoveableAttribute): string {
    relativePos.x -= this.boundingRect.x;
    relativePos.y -= this.boundingRect.y;

    let cursor = this.cursor || 'default';

    for (let i = this.components.length - 1; i >= 0; i--) {
      const component = this.components[i];
      const { x, y, w, h } = component.boundingRect;
      if (relativePos.x >= x && relativePos.y >= y && relativePos.x < (x + w) && relativePos.y < (y + h))
        return container.cursor.value = component.internalHandleMouseEvent(e, relativePos);
    }

    let returned = this.handleMouseEvent(e, relativePos);
    if (returned) cursor = returned;

    container.cursor.value = cursor;
    return cursor;
  }

  public mounted() {}
}