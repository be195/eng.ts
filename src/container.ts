import { BaseState } from './states/basestate';
import initial from './states/initial/index';
import gameplay from './states/gameplay/index';
import { MoveableAttribute } from './utils/types/moveablesizeableattr';

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

import './error.css';

export class Container {
  public canvas?: HTMLCanvasElement;
  public context?: CanvasRenderingContext2D;
  private crashed: ERROR_STATES = ERROR_STATES.NONE;
  private error?: Error;
  private halt = false;
  private previousAnimationFrameTime: number = 0;
  private stateID: string = 'initial';
  private next?: string;
  private states: Record<string, BaseState> = { initial, gameplay };

  constructor() {
    this.handleUserEvent = this.handleUserEvent.bind(this);
    this.animationFrame = this.animationFrame.bind(this);
  }

  public assign(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const context = this.canvas.getContext('2d');
    if (!context)
      throw new Error('no 2d context could be made');
    this.context = context;

    for (const event of USER_EVENTS)
      document.addEventListener(event, this.handleUserEvent);

    window.requestAnimationFrame(this.animationFrame);
  }

  public destroy() {
    for (const event of USER_EVENTS)
      document.removeEventListener(event, this.handleUserEvent);

    this.canvas = undefined;
    this.context = undefined;
    this.halt = true;
  }

  private handleUserEvent(e: Event) {
    if (!this.state || !this.canvas) return;
    if (this.error && e.type === 'keydown' && (e as KeyboardEvent).key.toLowerCase() === 'r')
      window.location.reload();

    // keyboard events start with "key", everything else are mouse events
    if (e.type.startsWith('key'))
      this.state.handleKeyboardEvent(e as KeyboardEvent)
    else {
      const event = e as MouseEvent;

      let relativePos: MoveableAttribute = { x: 0, y: 0 };

      // canvas' top is touching the DOM viewport's top as bottom is touching bottom
      if (window.innerWidth / window.innerHeight >= this.canvas.width / this.canvas.height) {
        const windowToCanvasRatio = window.innerHeight / this.canvas.height;
        const offset = (window.innerWidth - this.canvas.width * windowToCanvasRatio) / 2;
        const canvasToWindowRatio = this.canvas.height / window.innerHeight;
        relativePos.x = (event.clientX - offset) * canvasToWindowRatio;
        relativePos.y = event.clientY * canvasToWindowRatio;
      } else { // canvas' left is touching the DOM viewport's left as right is touching right
        const windowToCanvasRatio = window.innerWidth / this.canvas.width;
        const offset = (window.innerHeight - this.canvas.height * windowToCanvasRatio) / 2;
        const canvasToWindowRatio = this.canvas.width / window.innerWidth;
        relativePos.x = event.clientX * canvasToWindowRatio;
        relativePos.y = (event.clientY - offset) * canvasToWindowRatio;
      }

      this.state.internalHandleMouseEvent(event, relativePos);
    }
  }

  private get state() {
    if (this.stateID && this.stateID in this.states)
      return this.states[this.stateID];

    return undefined;
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

    content.append(text, trace);
    elementContainer.append(header, content);
    document.body.prepend(elementContainer);
  }

  private animationFrame(time: number) {
    if (!this.canvas || !this.context) return;
    if (this.next) {
      if (this.state)
        this.state.internalDestroy();
      this.stateID = this.next;
      this.state?.internalMounted(this.canvas, this.context);
      this.next = undefined;
    }

    if (this.crashed) return;
    if (this.halt) {
      this.halt = false;
      return;
    }

    const deltaTime = this.previousAnimationFrameTime ? time - this.previousAnimationFrameTime : 0;
    this.previousAnimationFrameTime = time;

    const { width, height } = this.canvas;
    this.context.clearRect(0, 0, width, height);

    try {
      this.state?.internalUpdate(deltaTime);
    } catch (err) {
      if (err instanceof Error) {
        this.crashed = ERROR_STATES.UPDATE;
        this.error = err;
      }
    }

    try {
      this.state?.internalRender();
    } catch (err) {
      if (err instanceof Error) {
        this.crashed = ERROR_STATES.RENDER;
        this.error = err;
      }
    }

    if (this.crashed)
      return this.appendErrorOverlay();

    window.requestAnimationFrame(t => this.animationFrame(t));
  }

  public switchTo(state: string) {
    if (state in this.states) {
      // we want to do this on the next frame as to
      // not interrupt the currently running frame
      this.next = state;
      return;
    }

    throw new Error(`State "${state}" does not exist.`);
  }
};

export default new Container();