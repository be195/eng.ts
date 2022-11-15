import { BaseState } from './states/basestate';

export class Container {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  private previousAnimationFrameTime: number;
  private state: string;
  private states: Record<string, BaseState>;
  
  public assign(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.importStates().then(
      () => window.requestAnimationFrame(t => this.animationFrame(t))
    );
  }

  async importStates() {
    const { default: InitialState } = await import('./states/initial/index');

    this.states = {
      initial: new InitialState(this.canvas, this.context)
    };

    this.state = Object.keys(this.states)[0];
  }

  animationFrame(time: number) {
    const deltaTime = this.previousAnimationFrameTime ? time - this.previousAnimationFrameTime : 0;
    this.previousAnimationFrameTime = time;

    const { width, height } = this.canvas;
    this.context.clearRect(0, 0, width, height)

    if (this.state && this.state in this.states) {
      const state = this.states[this.state];
      state.update(deltaTime);
      state.render();
    }

    window.requestAnimationFrame(t => this.animationFrame(t));
  }

  public switchTo(state: string) {
    if (state in this.states)
      return this.state = state;

    throw new Error(`State "${state}" does not exist.`);
  }
}

export default new Container();