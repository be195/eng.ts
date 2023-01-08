import { BaseState } from '../basestate';
import PlayerComponent from '@/components/playercomponent';

export class GameplayState extends BaseState {
  public get components() {
    return [ PlayerComponent ];
  }
};

export default new GameplayState();