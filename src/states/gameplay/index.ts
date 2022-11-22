import { BaseState } from '../basestate';
import SplashScreenImageComponent from '@/components/splashscreenimage';

export class GameplayState extends BaseState {
  public get components() {
    return [ SplashScreenImageComponent ];
  }
};