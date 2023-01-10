import { MoveableAttribute } from '@/utils/types/moveablesizeableattr';
import BaseComponent from './basecomponent';

class TestMouseMoveComponent extends BaseComponent {
  private mousemove: MoveableAttribute[] = [];

  public mounted(): void {
    if (!this.canvas) return;
    this.boundingRect.w = this.canvas.width;
    this.boundingRect.h = this.canvas.height;
  }

  public render() {
    if (!this.context) return;
    this.context.strokeStyle = '#ff0000';
    this.context.strokeRect(0, 0, this.boundingRect.w, this.boundingRect.h);
    this.context.beginPath();

    for (const { x, y } of this.mousemove)
      this.context.lineTo(x, y);

    this.context.stroke();
  }

  public handleMouseEvent(e: MouseEvent, relativePos: MoveableAttribute): void {
    this.mousemove.push(relativePos);
  }
}

export default new TestMouseMoveComponent();