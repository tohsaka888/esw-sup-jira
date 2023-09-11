export function removeDuplicates<T = any>(arr: T[], key: keyof T): T[] {
  const map = new Map<string, T>();
  for (const obj of arr) {
    if (!map.has(obj[key] as string)) {
      map.set(obj[key] as string, obj);
    }
  }
  return Array.from(map.values());
}
