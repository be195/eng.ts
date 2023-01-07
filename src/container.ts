import { BaseState } from './states/basestate';
import { InitialState } from './states/initial/index';
import { GameplayState } from './states/gameplay/index';

enum ERROR_STATES {
  NONE = 0,
  RENDER = 1,
  UPDATE = 2
}

const USER_EVENTS = [
  'mouseup',
  'mousedown',
  'mousemove',
  'click',
  'keydown',
  'keyup'
];

const error = require('./error.css');

export class Container {
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D;
  private crashed: ERROR_STATES = ERROR_STATES.NONE;
  private error: Error = null;
  private halt = false;
  private previousAnimationFrameTime: number;
  private stateID: string;
  private states: Record<string, BaseState>;

  constructor() {
    this.handleUserEvent = this.handleUserEvent.bind(this);
    this.animationFrame = this.animationFrame.bind(this);
  }

  public assign(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.importStates().then(
      () => window.requestAnimationFrame(this.animationFrame)
    );

    for (const event of USER_EVENTS)
      document.addEventListener(event, this.handleUserEvent);
  }

  public destroy() {
    for (const event of USER_EVENTS)
      document.removeEventListener(event, this.handleUserEvent);

    this.canvas = undefined;
    this.context = undefined;
    this.states = undefined;
    this.halt = true;
  }

  private handleUserEvent(e: Event) {
    if (this.error && e.type === 'keydown' && (e as KeyboardEvent).key.toLowerCase() === 'r')
      window.location.reload();

    // keyboard events start with "key", everything else are mouse events
    if (e.type.startsWith('key'))
      this.state.handleKeyboardEvent(e as KeyboardEvent)
    else
      this.state.handleMouseEvent(e as MouseEvent);
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

  private appendErrorOverlay() {
    if (this.crashed === ERROR_STATES.NONE || !this.error) return;
    const elementContainer = document.createElement('div');
    elementContainer.className = 'runtime-error';

    const header = document.createElement('div');
    header.className = 'header';
    const event = this.crashed === ERROR_STATES.RENDER ? 'render' : 'update';
    header.innerText = `A runtime error occurred on ${event} (${this.error.name})`;

    const content = document.createElement('div');
    content.className = 'content';

    const text = document.createElement('span');
    text.innerText = 'The application was halted. It is recommended that you reload this application.';

    const trace = document.createElement('div');
    trace.className = 'trace';
    trace.innerText = this.error.message + '\n\n' + this.error.stack;

    error.default.use();

    content.append(text, trace);
    elementContainer.append(header, content);
    document.body.prepend(elementContainer);
  }

  private animationFrame(time: number) {
    if (this.crashed) return;
    const deltaTime = this.previousAnimationFrameTime ? time - this.previousAnimationFrameTime : 0;
    this.previousAnimationFrameTime = time;

    const { width, height } = this.canvas;
    this.context.clearRect(0, 0, width, height);

    try {
      this.state.internalUpdate(deltaTime);
    } catch (err) {
      this.crashed = ERROR_STATES.UPDATE;
      this.error = err;
    }

    try {
      this.state.internalRender();
    } catch (err) {
      this.crashed = ERROR_STATES.RENDER;
      this.error = err;
    }

    if (this.crashed)
      return this.appendErrorOverlay();

    if (this.halt) {
      this.halt = false;
      return;
    }

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
};

export default new Container();