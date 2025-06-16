function binaryInsertSorted<T>(
  list: T[],
  item: T,
  compare: (a: T, b: T) => number,
): void {
  let low = 0
  let high = list.length

  while (low < high) {
    const mid = (low + high) >>> 1
    if (compare(list[mid], item) < 0) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  list.splice(low, 0, item)
}

type Comparator<T> = (a: T, b: T) => number

function compareAsc<T>(selector: (item: T) => number): Comparator<T> {
  return (a, b) => selector(a) - selector(b)
}

function compareDesc<T>(selector: (item: T) => number): Comparator<T> {
  return (a, b) => selector(b) - selector(a)
}

function getMin<T>(
  arr: T[],
  fn: (item: T) => number | undefined | null,
): number {
  if (!arr.length) return Infinity
  return Math.min(...arr.map((x) => fn(x) ?? Infinity))
}

function sortByFunc<T>(items: T[], fn: (item: T) => number): T[] {
  return items.slice().sort((a, b) => fn(a) - fn(b))
}
export { binaryInsertSorted, compareAsc, compareDesc, getMin, sortByFunc }
