'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import {
  CPTCategoryCodeSets,
  MetaDataCodeSet,
  POSCodeSets,
} from '../coding-cpt/types'
import { CodingStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<CodingStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  posCodeSets: POSCodeSets
  cptCategoryCodeSets: CPTCategoryCodeSets[]
}

const Preloader = ({
  store,
  posCodeSets,
  cptCategoryCodeSets,
}: PreloaderProps) => {
  const loaded = useRef(false)
  const { setCodingPosCodeSets } = store((state) => ({
    setCodingPosCodeSets: state.setCodingPosCodeSets,
  }))
  const { setCodingCptCategoryCodeSets } = store((state) => ({
    setCodingCptCategoryCodeSets: state.setCodingCptCategoryCodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true
    const optionsList: MetaDataCodeSet[] = []
    for (let index = 0; index < posCodeSets.codes.length; index++) {
      const state = posCodeSets.codes[index]
      optionsList.push({
        display: state.displayName,
        code: state.code,
        attributes: state.codeAttributes,
      })
    }
    setCodingPosCodeSets(optionsList)
    const feeScheduleCategory = cptCategoryCodeSets.find(
      (element) => element.code === 'FeeScheduleCategory',
    )

    if (feeScheduleCategory) {
      const cptOptionsList: MetaDataCodeSet[] = []
      for (let index = 0; index < feeScheduleCategory.codes.length; index++) {
        const state = feeScheduleCategory.codes[index]
        cptOptionsList.push({ display: state.display, code: state.code })
      }
      setCodingCptCategoryCodeSets(cptOptionsList)
    }
  }

  return null
}

export { Preloader }
