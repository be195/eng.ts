import BaseComponent from './basecomponent';

class SplashScreenImageComponent extends BaseComponent {
  private readonly image = new Image();

  constructor() {
    super();
    this.image.src = '/images/ss.png';
  }

  public render() {
    this.context.fillStyle = 'white';
    this.context.drawImage(
      this.image,
      this.boundingRect.x,
      this.boundingRect.y,
      this.boundingRect.w,
      this.boundingRect.h
    );
  }
}

export default new SplashScreenImageComponent();