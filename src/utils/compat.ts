// This function is intended to add method `toSorted` to `Array` class since
// the core implementation of it is not presented in Node.js (yet)
export const toSorted = <T>(array: T[], predicate: (a: T, b: T) => number): T[] => {
  return [...array].sort(predicate);
}
