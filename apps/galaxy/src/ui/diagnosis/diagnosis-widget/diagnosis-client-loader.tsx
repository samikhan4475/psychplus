'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import {
  DiagnosisIcd10Code,
  FavouriteDiagnosisData,
  QuickNoteSectionItem,
} from '@/types'
import {
  getFavouriteDiagnosisAction,
  getIcd10DiagnosisAction,
} from '../client-actions'
import { DiagnosisWidget } from './diagnosis-widget'

interface DiagnosisWidgetClientLoaderProps {
  data?: QuickNoteSectionItem[]
}

const DiagnosisWidgetClientLoader = ({
  data = [],
}: DiagnosisWidgetClientLoaderProps) => {
  const { staffId } = useStore((state) => ({
    staffId: state.user.staffId,
  }))
  const [workingDiagnosisData, setWorkingDiagnosisData] = useState<
    DiagnosisIcd10Code[]
  >([])
  const [favouritesDiagnosisData, setFavouritesDiagnosisData] = useState<
    FavouriteDiagnosisData[]
  >([])
  const { sectionItemValue } = data?.[0] || {}

  useEffect(() => {
    let DiagnosisCodes = sectionItemValue?.split(',') || []
    if (sectionItemValue === 'empty' || DiagnosisCodes?.length === 0) {
      DiagnosisCodes = []
    }
    if (DiagnosisCodes?.length && staffId) {
      Promise.all([
        getIcd10DiagnosisAction({
          DiagnosisCodes,
        }),
        getFavouriteDiagnosisAction(staffId),
      ]).then(([workingResponse, favouritesResponse]) => {
        if (workingResponse.state === 'error') {
          return workingResponse?.error
        }
        if (favouritesResponse.state === 'error') {
          return favouritesResponse?.error
        }
        setWorkingDiagnosisData(workingResponse.data ?? [])
        setFavouritesDiagnosisData(favouritesResponse.data ?? [])
      })
    }
  }, [sectionItemValue, staffId])

  return (
    <DiagnosisWidget
      workingDiagnosis={workingDiagnosisData}
      favouriteDiagnosis={favouritesDiagnosisData}
    />
  )
}

export { DiagnosisWidgetClientLoader }
