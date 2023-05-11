import { EventEmitter } from 'events';

export class Reference<T> extends EventEmitter {
  private _value?: T;

  constructor(value?: T) {
    super();
    if (value)
      this._value = value;
  }

  public get value(): T | undefined {
    return this._value;
  }

  public once(name: 'change', func: (previousValue: T, newValue: T) => void): this {
    return super.once(name, func);
  }

  public on(name: 'change', func: (previousValue: T, newValue: T) => void): this {
    return super.on(name, func);
  }

  public off(name: 'change', func: (previousValue: T, newValue: T) => void): this {
    return super.off(name, func);
  }

  public set value(newValue: T | undefined) {
    const previousValue = this._value;
    this._value = newValue;

    if (previousValue !== newValue)
      this.emit('change', previousValue, newValue);
  }
}

export default function ref<T>(value?: T) {
  return new Reference<T>(value);
}

export function unref<T>(value: Reference<T> | T): T | undefined {
  return value instanceof Reference ? value.value : value;
}