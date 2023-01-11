
import BaseComponent from '@/components/basecomponent';
import container from '@/container';

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

  public mounted() {}
}