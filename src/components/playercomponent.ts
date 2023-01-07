import BaseComponent from './basecomponent';
import common from '@/spritesheets/common';

class PlayerComponent extends BaseComponent {
  private readonly anim = common.useAnimation('test');

  constructor() {
    super();
  }

  public render() {
    this.context.fillStyle = 'white';
    this.anim.render(this.context);
  }

  public update(dt: number) {
    this.anim.update(dt);
  }
}

export default new PlayerComponent();