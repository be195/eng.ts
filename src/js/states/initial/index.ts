import { BaseState } from '../basestate';
import SplashScreenImageComponent from '../../components/splashscreenimage';

export default class InitialState extends BaseState {
  get components() {
    return [ SplashScreenImageComponent ];
  }
};