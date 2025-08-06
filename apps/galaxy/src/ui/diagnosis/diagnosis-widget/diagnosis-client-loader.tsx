'use client'

import { useEffect, useMemo, useState } from 'react'
import { dequal } from 'dequal'
import { useDebounce } from 'use-debounce'
import { useStore } from '@/store'
import { DiagnosisIcd10Code, FavouriteDiagnosisData } from '@/types'
import { isNeuroPsychVisit } from '@/ui/fit-for-duty-psych-eval/widget/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore as useQuicknoteStore } from '@/ui/quicknotes/store'
import {
  getFavouriteDiagnosisAction,
  getIcd10DiagnosisAction,
} from '../client-actions'
import { FITNESS_FOR_DUTY_ICD_CODE } from '../diagnosis/utils'
import { DiagnosisWidget } from './diagnosis-widget'

interface DiagnosisWidgetClientLoaderProps {
  patientId: string
  visitType?: string
}
const DiagnosisWidgetClientLoader = ({
  patientId,
  visitType,
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
    DiagnosisIcd10Code[]
  >([])
  const [favouritesDiagnosisData, setFavouritesDiagnosisData] = useState<
    FavouriteDiagnosisData[]
  >([])
  const sectionItemValue = useMemo(
    () => data?.[0].sectionItemValue,
    [data?.[0]],
  )
  const [debouncedValue] = useDebounce(sectionItemValue, 1500)
  useEffect(() => {
    if (!staffId) return
    getFavouriteDiagnosisAction(staffId).then((res) => {
      if (res.state === 'success') setFavouritesDiagnosisData(res.data)
    })
  }, [staffId])

  useEffect(() => {
    if (!debouncedValue || debouncedValue === 'empty') return

    const codes = debouncedValue.split(',')

    if (
      !codes.includes(FITNESS_FOR_DUTY_ICD_CODE) &&
      visitType &&
      isNeuroPsychVisit(visitType)
    ) {
      codes.push(FITNESS_FOR_DUTY_ICD_CODE)
  }
    getIcd10DiagnosisAction({ DiagnosisCodes: codes }).then((res) => {
      if (res.state === 'success') {
        setWorkingDiagnosisData(res.data)
      }
    })
  }, [debouncedValue])
  return (
    <DiagnosisWidget
      workingDiagnosis={workingDiagnosisData}
      favouriteDiagnosis={favouritesDiagnosisData}
      patientId={patientId}
    />
  )
}

export { DiagnosisWidgetClientLoader }
