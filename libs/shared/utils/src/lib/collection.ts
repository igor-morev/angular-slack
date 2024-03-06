export function removeDublicates<T extends object>(array: T[]): T[] {
  return Array.from(new Set(array.map((item) => JSON.stringify(item)))).map(
    (item) => JSON.parse(item)
  );
}
