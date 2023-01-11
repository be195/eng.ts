import BaseComponent from './basecomponent';
import common from '@/spritesheets/common';
import container from '@/container';

class PlayerComponent extends BaseComponent {
  private readonly anim = common.useAnimation('test');

  constructor() {
    super();
  }

  public mounted(): void {
    common.use();
  }

  public render() {
    if (!container.context) return;
    container.context.fillStyle = 'white';
    this.anim.render();
  }

  public update(dt: number) {
    this.anim.update(dt);
  }
}

export default new PlayerComponent();