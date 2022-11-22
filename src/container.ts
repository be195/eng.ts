import { BaseState } from '@/states/basestate';
import { InitialState } from '@/states/initial/index';
import { GameplayState } from '@/states/gameplay/index';

export class Container {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  private previousAnimationFrameTime: number;
  private stateID: string;
  private states: Record<string, BaseState>;
  
  public assign(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.importStates().then(
      () => window.requestAnimationFrame(t => this.animationFrame(t))
    );
  }

  private get state() {
    if (this.stateID && this.stateID in this.states)
      return this.states[this.stateID];

    return undefined;
  } 

  private async importStates() {
    this.states = {
      initial: new InitialState(this.canvas, this.context),
      gameplay: new GameplayState(this.canvas, this.context)
    };

    this.switchTo('initial');
  }

  private animationFrame(time: number) {
    const deltaTime = this.previousAnimationFrameTime ? time - this.previousAnimationFrameTime : 0;
    this.previousAnimationFrameTime = time;

    const { width, height } = this.canvas;
    this.context.clearRect(0, 0, width, height)

    this.state.internalUpdate(deltaTime);
    this.state.internalRender();

    window.requestAnimationFrame(t => this.animationFrame(t));
  }

  public switchTo(state: string) {
    if (state in this.states) {
      this.stateID = state;
      this.state.mounted();
      return;
    }

    throw new Error(`State "${state}" does not exist.`);
  }
}

export default new Container();