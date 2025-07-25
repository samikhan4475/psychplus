class Node<T> {
  public value: T
  public next?: Node<T>

  constructor(value: T) {
    this.value = value
  }
}

class Queue<T> implements Iterable<T> {
  private head?: Node<T>
  private tail?: Node<T>
  private _size = 0

  constructor() {
    this.clear()
  }

  enqueue(value: T): void {
    const node = new Node(value)
    if (this.tail) {
      this.tail.next = node
      this.tail = node
    } else {
      // first element
      this.head = node
      this.tail = node
    }
    this._size++
  }

  dequeue(): T | undefined {
    const node = this.head
    if (!node) return undefined

    this.head = node.next
    this._size--
    if (!this.head) this.tail = undefined
    return node.value
  }

  peek(): T | undefined {
    return this.head?.value
  }

  clear(): void {
    this.head = undefined
    this.tail = undefined
    this._size = 0
  }

  get size(): number {
    return this._size
  }

  *[Symbol.iterator]() {
    let curr = this.head
    while (curr) {
      yield curr.value
      curr = curr.next
    }
  }

  *drain() {
    while (this.head) {
      const nextVal = this.dequeue()
      if (nextVal !== undefined) {
        yield nextVal
      }
    }
  }
}

export { Queue }
