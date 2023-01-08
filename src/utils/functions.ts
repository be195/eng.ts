export function lerp(a: number, b: number, t: number) {
  t = Math.min(Math.max(t, 0), 1);
  return b * t + a * (1 - t);
};