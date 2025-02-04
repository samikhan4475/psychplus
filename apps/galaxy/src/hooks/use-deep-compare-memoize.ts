import { DependencyList, useMemo, useRef } from 'react'
import { dequal } from 'dequal'

export function useDeepCompareMemoize(dependencies: DependencyList) {
  const dependenciesRef = useRef<DependencyList>(dependencies)
  const signalRef = useRef<number>(0)

  if (!dequal(dependencies, dependenciesRef.current)) {
    dependenciesRef.current = dependencies
    signalRef.current += 1
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => dependenciesRef.current, [signalRef.current])
}
