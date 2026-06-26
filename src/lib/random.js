export function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
