'use client'

import { useRef } from 'react'
import { StoreApi, UseBoundStore } from 'zustand'
import { type TemplateStoreType } from './store'
import { AuthorityCodeSet, ParameterCodeSet } from '@psychplus/codeset'

type BoundStoreType = UseBoundStore<StoreApi<TemplateStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  reportCategories: AuthorityCodeSet
  parameterCodeSets: ParameterCodeSet[]
}

const Preloader = ({ store, reportCategories, parameterCodeSets }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setReportCategories, setParameterCodeSets } = store((state) => ({
    setReportCategories: state.setReportCategories,
    setParameterCodeSets: state.setParameterCodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true
    setReportCategories(reportCategories)
    setParameterCodeSets(parameterCodeSets)
  }

  return null
}

export { Preloader }
