import React from 'react'
import { dequal } from 'dequal'

export function useDeepCompareMemoization(dependencies: React.DependencyList) {
  const dependenciesReference = React.useRef<React.DependencyList>(dependencies)
  const signalReference = React.useRef<number>(0)

  if (!dequal(dependencies, dependenciesReference.current)) {
    dependenciesReference.current = dependencies
    signalReference.current += 1
  }

  return React.useMemo(
    () => dependenciesReference.current,
    [signalReference.current],
  )
}
