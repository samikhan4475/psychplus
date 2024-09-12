'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { Code } from '@psychplus/lab-orders/types'
import { type LabOrdersStoreType } from './store'
import { LabOrder, LabTest } from './types'

type BoundStoreType = UseBoundStore<StoreApi<LabOrdersStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: CodeSet[]
  labOrders: LabOrder[]
  tests: LabTest[]
  resultFlags: Code[]
  resultStatus: Code[]
}

const Preloader = ({
  store,
  codeSets,
  labOrders,
  tests,
  resultFlags,
  resultStatus,
}: PreloaderProps) => {
  const loaded = useRef(false)
  const {
    setCodeSets,
    setLabOrders,
    setTests,
    setResultFlags,
    setResultStatus,
  } = store((state) => ({
    setCodeSets: state.setCodeSets,
    setTests: state.setTests,
    setLabOrders: state.setLabOrders,
    setResultFlags: state.setResultFlags,
    setResultStatus: state.setResultStatus,
  }))

  if (!loaded.current) {
    loaded.current = true
    setCodeSets(codeSets)
    setLabOrders(labOrders)
    setTests(tests)
    setResultFlags(resultFlags)
    setResultStatus(resultStatus)
  }

  return null
}

export { Preloader }
