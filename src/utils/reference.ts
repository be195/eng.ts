export class Reference<T> {
  private _value: T;
  private subscribers: Map<string, (value: T) => any> = new Map();

  constructor(value?: T) {
    if (value)
      this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  public set value(newValue: T) {
    const previousValue = this._value;
    this._value = newValue;

    if (previousValue !== newValue)
      this.subscribers.forEach(subscriber => subscriber(newValue));
  }

  public subscribe(name: string, func: (value: T) => any) {
    this.subscribers.set(name, func);
  }

  public unsubscribe(name: string) {
    this.subscribers.delete(name);
  }
}

export default function ref<T>(value?: T) {
  return new Reference<T>(value);
}