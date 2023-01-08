import { BaseState } from '../basestate';
import SplashScreenImageComponent from '@/components/splashscreenimage';
import container from '@/container';

export class InitialState extends BaseState {
  constructor() {
    super();
    this.ended = this.ended.bind(this);
  }

  public get components() {
    return [ SplashScreenImageComponent ];
  }

  public mounted() {
    SplashScreenImageComponent.addEventListener('end', this.ended);
  }

  private ended() {
    container.switchTo('gameplay');
    console.log('ok')
  }
};

export default new InitialState();