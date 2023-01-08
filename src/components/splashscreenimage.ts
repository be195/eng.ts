import { lerp } from '@/utils/functions';
import { MoveableAttribute } from '@/utils/types/moveablesizeableattr';
import BaseComponent from './basecomponent';

class SplashScreenImageComponent extends BaseComponent {
  private clickedAt: number;
  private lock = false;
  private readonly image = new Image();

  constructor() {
    super();
    this.image.src = '/images/ss.png';
  }

  public mounted(): void {
    this.boundingRect.w = this.canvas.width;
    this.boundingRect.h = this.canvas.height;
  }

  public destroy(): void {
    this.clickedAt = undefined;
  }

  private get delta() {
    return (Date.now() - this.clickedAt) / 1000;
  }

  public render() {
    this.context.globalAlpha = this.clickedAt ? lerp(1, 0, this.delta) : 1;

    if (this.context.globalAlpha === 0 && !this.lock) {
      this.emit('end');
      this.lock = true;
      return;
    }

    this.context.fillStyle = 'white';
    this.context.drawImage(
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
}

export default new SplashScreenImageComponent();