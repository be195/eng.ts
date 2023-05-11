import ref, { Reference } from './reference';

const storage: Map<string, Reference<any>> = new Map();

export function useStore<T>(name: string, defaultValue: T) {
  if (storage.has(name))
    return storage.get(name);

  const reference = ref(defaultValue);
  storage.set(name, reference);
  return reference;
}

export function clearStore() {
  storage.clear();
}