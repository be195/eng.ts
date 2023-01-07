import { BaseState } from '../basestate';
import SplashScreenImageComponent from '@/components/splashscreenimage';
import container from '@/container';

export class InitialState extends BaseState {
  public get components() {
    return [ SplashScreenImageComponent ];
  }

  public mounted() {
    // console.log('Switching to gameplay right away...');
    // container.switchTo('gameplay');
  }
};