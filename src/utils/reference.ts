import { EventEmitter } from './events';

export class Reference<T> extends EventEmitter {
  private _value: T;

  constructor(value?: T) {
    super();
    if (value)
      this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  public addEventListener(name: string, func: (previousValue: T, newValue: T) => void): void {
    super.addEventListener(name, func);
  }

  public set value(newValue: T) {
    const previousValue = this._value;
    this._value = newValue;

    if (previousValue !== newValue)
      this.emit('change', previousValue, newValue);
  }
}

export default function ref<T>(value?: T) {
  return new Reference<T>(value);
}