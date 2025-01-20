'use client'

import { useEffect } from 'react'
import { RevenueCycleTabs } from './revenue-cycle-tabs'
import {
  RevCycleProvider,
  useRevCycleDataProvider,
} from './revCycleContext'

const RevenueCycleContent = () => {
  const { fetchClaimOptionsData } = useRevCycleDataProvider()

  useEffect(() => {
    fetchClaimOptionsData()
  }, [])

  return <RevenueCycleTabs />
}

const RevenueCycleView = () => {
  return (
    <RevCycleProvider>
      <RevenueCycleContent />
    </RevCycleProvider>
  )
}

export { RevenueCycleView }
