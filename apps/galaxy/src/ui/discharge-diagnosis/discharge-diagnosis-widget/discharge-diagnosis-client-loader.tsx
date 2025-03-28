'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { useDeepCompareMemo } from '@/hooks/use-deep-compare-memo'
import { useStore } from '@/store'
import { DiagnosisIcd10Code, FavouriteDiagnosisData } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore as useQuicknoteStore } from '@/ui/quicknotes/store'
import {
  getFavouriteDiagnosisAction,
  getIcd10DiagnosisAction,
} from '../client-actions'
import { DischargeDiagnosisWidget } from './discharge-diagnosis-widget'

interface DischargeDiagnosisClientLoaderProps {
  patientId: string
  appointmentId: string
}
const DischargeDiagnosisClientLoader = ({
  patientId,
  appointmentId,
}: DischargeDiagnosisClientLoaderProps) => {
  const { staffId } = useStore((state) => ({
    staffId: state.user.staffId,
  }))
  const data = useQuicknoteStore(
    useShallow(
      (state) =>
        state.actualNotewidgetsData?.[
          QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
        ],
    ),
  )
  const [favouritesData, setFavouritesData] = useState<
    Array<FavouriteDiagnosisData>
  >([])
  const [DiagnosisData, setDiagnosisData] = useState<Array<DiagnosisIcd10Code>>(
    [],
  )
  const DiagnosisCodes = useDeepCompareMemo(() => {
    const sectionItem = data?.filter(
      (item) => item.sectionItemValue !== 'empty',
    )?.[0]
    if (sectionItem) {
      return sectionItem?.sectionItemValue?.split(',') ?? []
    }
    return []
  }, [data])

  useEffect(() => {
    getFavouriteDiagnosisAction(staffId).then((workingResponse) => {
      if (workingResponse.state === 'error') {
        return toast.error(workingResponse?.error)
      }
      setFavouritesData(workingResponse.data ?? [])
    })
  }, [staffId])

  useEffect(() => {
    if (DiagnosisCodes?.length) {
      getIcd10DiagnosisAction({
        DiagnosisCodes,
      }).then((diagnosisResponse) => {
        if (diagnosisResponse.state === 'error') {
          return toast.error(diagnosisResponse?.error)
        }
        setDiagnosisData(diagnosisResponse.data ?? [])
      })
    }
  }, [DiagnosisCodes])

  return (
    <DischargeDiagnosisWidget
      workingDiagnosis={DiagnosisData}
      favouriteDiagnosis={favouritesData}
      patientId={patientId}
      appointmentId={appointmentId}
    />
  )
}

export { DischargeDiagnosisClientLoader }
