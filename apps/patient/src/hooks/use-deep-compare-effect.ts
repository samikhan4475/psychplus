import React from 'react'
import { useDeepCompareMemoization } from './use-deep-compare-memoization'

/**
 * Warning: `useDeepCompareEffect` should not be used with dependencies that
 * are all primitive values. Use `React.useEffect` instead.
 */

export function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: React.DependencyList,
) {
  React.useEffect(effect, useDeepCompareMemoization(dependencies))
}
