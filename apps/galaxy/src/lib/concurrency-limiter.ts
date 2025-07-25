import { Queue } from './h-queue'

type Task<T> = () => Promise<T>

 interface ConcurrencyLimiter {
  <T>(task: Task<T>): Promise<T>
  readonly activeCount: number
  readonly pendingCount: number
  clearQueue(): void
  concurrency: number
}

 function concurrencyLimiter(concurrency: number): ConcurrencyLimiter {
  const queue = new Queue<() => void>()
  let activeCount = 0
  let currentConcurrency = concurrency

  const resumeNext = () => {
    if (activeCount < currentConcurrency && queue.size > 0) {
      activeCount++
      queue.dequeue()
    }
  }

  const next = () => {
    activeCount--
    resumeNext()
  }

  const run = async <T>(
    task: Task<T>,
    resolve: (value: T) => void,
  ): Promise<void> => {
    try {
      const result = await task()
      resolve(result)
    } catch {
      // swallow errors or handle as needed
    } finally {
      next()
    }
  }

  const enqueue = <T>(task: Task<T>, resolve: (value: T) => void): void => {
    // enqueue the runner
    queue.enqueue(() => run(task, resolve))
    // kick off if under concurrency limit
    queueMicrotask(resumeNext)
  }

  const limiter = <T>(task: Task<T>): Promise<T> =>
    new Promise((resolve) => {
      enqueue(task, resolve)
    })

  Object.defineProperties(limiter, {
    activeCount: { get: () => activeCount },
    pendingCount: { get: () => queue.size },
    clearQueue: { value: () => queue.clear() },
    concurrency: {
      get: () => currentConcurrency,
      set(newConcurrency: number) {
        currentConcurrency = newConcurrency
        queueMicrotask(resumeNext)
      },
    },
  })

  return limiter as ConcurrencyLimiter
}

export {concurrencyLimiter}