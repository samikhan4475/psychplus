'use client'

import { useEffect, useMemo, useState } from 'react'
import { dequal } from 'dequal'
import { useStore } from '@/store'
import { DiagnosisIcd10Code, FavouriteDiagnosisData } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore as useQuicknoteStore } from '@/ui/quicknotes/store'
import {
  getFavouriteDiagnosisAction,
  getIcd10DiagnosisAction,
} from '../client-actions'
import { DiagnosisWidget } from './diagnosis-widget'

interface DiagnosisWidgetClientLoaderProps {
  patientId: string
}
const DiagnosisWidgetClientLoader = ({
  patientId,
}: DiagnosisWidgetClientLoaderProps) => {
  const data = useQuicknoteStore(
    (state) =>
      state.actualNotewidgetsData[
        QuickNoteSectionName.QuickNoteSectionDiagnosis
      ],
    dequal,
  )
  const { staffId } = useStore((state) => ({
    staffId: state.user.staffId,
  }))
  const [workingDiagnosisData, setWorkingDiagnosisData] = useState<
    DiagnosisIcd10Code[] | undefined
  >(undefined)
  const [favouritesDiagnosisData, setFavouritesDiagnosisData] = useState<
    FavouriteDiagnosisData[]
  >([])
  const sectionItemValue = useMemo(
    () => data?.[0].sectionItemValue,
    [data?.[0]],
  )

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
      patientId={patientId}
    />
  )
}

export { DiagnosisWidgetClientLoader }
