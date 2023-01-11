import container from '@/container';
import { lerp } from '@/utils/functions';
import { MoveableAttribute } from '@/utils/types/moveablesizeableattr';

import BaseComponent from './basecomponent';

class SplashScreenImageComponent extends BaseComponent {
  private clickedAt?: number;
  private lock = false;
  private readonly image = new Image();

  constructor() {
    super();
    this.image.src = '/images/ss.png';
  }

  public mounted(): void {
    if (!container.canvas) return;
    this.boundingRect.w = container.canvas.width;
    this.boundingRect.h = container.canvas.height;
  }

  public destroy(): void {
    this.clickedAt = undefined;
  }

  private get delta() {
    return this.clickedAt ? (Date.now() - this.clickedAt) / 500 : 0;
  }

  public once(eventName: 'end', listener: () => void): this {
    return super.once(eventName, listener);
  }

  public on(eventName: 'end', listener: () => void): this {
    return super.on(eventName, listener);
  }

  public off(eventName: 'end', listener: () => void): this {
    return super.off(eventName, listener);
  }

  public render() {
    if (!container.context) return;
    container.context.globalAlpha = this.clickedAt ? lerp(1, 0, this.delta) : 1;

    if (container.context.globalAlpha === 0 && !this.lock) {
      this.emit('end');
      this.lock = true;
      return;
    }

    container.context.fillStyle = 'white';
    container.context.drawImage(
      this.image,
      this.boundingRect.x,
      this.boundingRect.y,
      this.boundingRect.w,
      this.boundingRect.h
    );
  }

  public handleMouseEvent(e: MouseEvent, _: MoveableAttribute): void {
    if (!this.clickedAt && e.type === 'click')
      this.clickedAt = Date.now();
  }
};

export default new SplashScreenImageComponent();