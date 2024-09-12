'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { type CodeSet } from '@psychplus/codeset'
import { Code, LabRecord } from '@psychplus/lab-orders/types'
import { type PreferredPartnersStoreType } from './store'
import { LabTest } from './types'

type BoundStoreType = UseBoundStore<StoreApi<PreferredPartnersStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  codeSets: CodeSet[]
  labOrders: LabRecord[]
  tests: LabTest[]
  resultFlags: Code[]
  resultStatus: Code[]
  resultUnits: Code[]
}

const Preloader = ({
  store,
  codeSets,
  labOrders,
  tests,
  resultFlags,
  resultStatus,
  resultUnits,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const {
    setCodeSets,
    setLabOrders,
    setTests,
    setResultFlags,
    setResultStatus,
    setResultUnits,
  } = store((state) => ({
    setCodeSets: state.setCodeSets,
    setTests: state.setTests,
    setLabOrders: state.setLabOrders,
    setResultFlags: state.setResultFlags,
    setResultStatus: state.setResultStatus,
    setResultUnits: state.setResultUnits,
  }))

  if (!loaded.current) {
    loaded.current = true
    setCodeSets(codeSets)
    setLabOrders(labOrders)
    setTests(tests)

    setResultFlags(resultFlags)
    setResultStatus(resultStatus)
    setResultUnits(resultUnits)
  }

  return null
}

export { Preloader }
