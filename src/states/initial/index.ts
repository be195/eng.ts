import { BaseState } from '../basestate';
import SplashScreenImageComponent from '@/components/splashscreenimage';
import container from '@/container';
import testmousemovecomponent from '@/components/testmousemovecomponent';

export class InitialState extends BaseState {
  constructor() {
    super();
    this.ended = this.ended.bind(this);
  }

  public get components() {
    return [ SplashScreenImageComponent, testmousemovecomponent ];
  }

  public mounted() {
    SplashScreenImageComponent.once('end', this.ended);
    testmousemovecomponent.boundingRect.x = 64;
    testmousemovecomponent.boundingRect.y = 32;
  }

  private ended() {
    container.stateID = 'gameplay';
  }
};

export default new InitialState();