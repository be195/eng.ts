import BaseComponent from './basecomponent';

class SplashScreenImageComponent extends BaseComponent {
  private readonly image = new Image();

  constructor() {
    super();

    this.image.src = '/images/ss.png';
  }

  public render(width: number, height: number) {
    this.context.fillStyle = 'white';
    this.context.drawImage(this.image, 0, 0, width, height);
  } 
}

export default new SplashScreenImageComponent();