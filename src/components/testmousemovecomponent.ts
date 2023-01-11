import container from '@/container';
import { MoveableAttribute } from '@/utils/types/moveablesizeableattr';
import BaseComponent from './basecomponent';

class TestMouseMoveComponent extends BaseComponent {
  private mousemove: MoveableAttribute[] = [];

  public mounted(): void {
    if (!container.canvas) return;
    this.boundingRect.w = container.canvas.width;
    this.boundingRect.h = container.canvas.height;
  }

  public render() {
    if (!container.context) return;
    container.context.strokeStyle = '#ff0000';
    container.context.strokeRect(0, 0, this.boundingRect.w, this.boundingRect.h);
    container.context.beginPath();

    for (const { x, y } of this.mousemove)
      container.context.lineTo(x, y);

    container.context.stroke();
  }

  public handleMouseEvent(e: MouseEvent, relativePos: MoveableAttribute): void {
    this.mousemove.push(relativePos);
  }
}

export default new TestMouseMoveComponent();