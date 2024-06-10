'use client'

import { useRef } from 'react'
import { StoreApi, UseBoundStore } from 'zustand'
import { type TemplateStoreType } from './store'
import { Parameter } from './types'
import { AuthorityCodeSet } from '@psychplus/codeset'

type BoundStoreType = UseBoundStore<StoreApi<TemplateStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  parameters: Parameter[]
  reportCategories: AuthorityCodeSet
}

const Preloader = ({ store, parameters, reportCategories }: PreloaderProps) => {
  const loaded = useRef(false)

  const { setParameters, setReportCategories } = store((state) => ({
    setUser: state.setUser,
    setParameters: state.setParameters,
    setReportCategories: state.setReportCategories,
  }))

  if (!loaded.current) {
    loaded.current = true
    setParameters(parameters)
    setReportCategories(reportCategories)
  }

  return null
}

export { Preloader }
