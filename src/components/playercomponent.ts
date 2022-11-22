import BaseComponent from './basecomponent';
import common from 'spritesheets/common';

class PlayerComponent extends BaseComponent {
  private readonly image = new Image();

  constructor() {
    super();
    this.image.src = '/images/ss.png';
  }

  public render() {
    this.context.fillStyle = 'white';
    this.context.drawImage(this.image, 0, 0, this.boundingRect.w, this.boundingRect.h);
  }
}

export default new PlayerComponent();