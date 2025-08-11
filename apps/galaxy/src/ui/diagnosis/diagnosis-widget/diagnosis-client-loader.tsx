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
    const parsedCodes =
      debouncedValue && debouncedValue !== 'empty'
        ? debouncedValue?.split(',')
        : []

    const shouldAddFitnessCode  =
      visitType &&
      isNeuroPsychVisit(visitType) &&
      !parsedCodes.includes(FITNESS_FOR_DUTY_ICD_CODE)

    if (shouldAddFitnessCode) {
      parsedCodes.push(FITNESS_FOR_DUTY_ICD_CODE)
    }

  if (parsedCodes.length === 0) return
  
    getIcd10DiagnosisAction({ DiagnosisCodes: parsedCodes }).then((res) => {
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
