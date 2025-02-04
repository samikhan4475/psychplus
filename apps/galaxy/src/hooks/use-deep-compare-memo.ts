import { DependencyList, useMemo } from 'react'
import { useDeepCompareMemoize } from './use-deep-compare-memoize'

export function useDeepCompareMemo<T>(
  factory: () => T,
  dependencies: DependencyList,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, useDeepCompareMemoize(dependencies))
}
