import Reference from './reference';

const storage = new Map();

export default function useStore<T>(name: string, defaultValue: T) {
  if (storage.has(name))
    return storage.get(name);

  const ref = new Reference<T>(defaultValue);
  storage.set(name, ref);
  return ref;
}