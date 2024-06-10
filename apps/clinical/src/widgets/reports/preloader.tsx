'use client'

import { useRef } from 'react'
import { type StoreApi, type UseBoundStore } from 'zustand'
import { AuthorityCodeSet, CodeSet, ParameterCodeSet } from '@psychplus/codeset'
import { Template } from '@psychplus/reports'
import { type ReportsStoreType } from './store'

type BoundStoreType = UseBoundStore<StoreApi<ReportsStoreType>>

interface PreloaderProps {
  store: BoundStoreType
  reportCategories: AuthorityCodeSet
  codeSets: CodeSet[]
  reportTemplates: Template[]
  parameterCodeSets: ParameterCodeSet[]
}

const Preloader = ({
  store,
  reportCategories,
  codeSets,
  reportTemplates,
  parameterCodeSets,
}: PreloaderProps) => {
  const loaded = useRef(false)

  const {
    setReportCategories,
    setCodeSets,
    setReportTemplates,
    setParameterCodeSets,
  } = store((state) => ({
    setReportCategories: state.setReportCategories,
    setReportTemplates: state.setReportTemplates,
    setParameterCodeSets: state.setParameterCodeSets,
    setCodeSets: state.setCodeSets,
  }))

  if (!loaded.current) {
    loaded.current = true
    setReportCategories(reportCategories)
    setReportTemplates(
      reportTemplates.filter(
        (template) => template.resourceStatus === 'Active',
      ),
    )
    setCodeSets(codeSets)
    setParameterCodeSets(parameterCodeSets)
  }

  return null
}

export { Preloader }
