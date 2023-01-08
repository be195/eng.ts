export class EventEmitter {
  private subscribers: Map<string, (...args: any) => void> = new Map();

  public addEventListener(name: string, func: (...args: any) => void) {
    this.subscribers.set(name, func);
  }

  public removeEventListener(name: string) {
    this.subscribers.delete(name);
  }

  public emit(name: string, ...args: any) {
    this.subscribers.forEach((subscriber, key) => name === key && subscriber(...args));
  }
}