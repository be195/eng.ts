export default class Reference<T> {
  private _value: T;
  private subscribers: Map<string, (value: T) => any> = new Map();

  constructor(defaultValue?: T) {
    if (defaultValue)
      this._value = defaultValue;
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