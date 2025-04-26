'use client'

import { useEffect, useState } from 'react'
import { dequal } from 'dequal'
import toast from 'react-hot-toast'
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
    (state) =>
      state.actualNotewidgetsData?.[
        QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
      ],
    dequal,
  )
  console.log({ data })
  const [favouritesData, setFavouritesData] = useState<
    Array<FavouriteDiagnosisData>
  >([])
  const [diagnosisData, setDiagnosisData] = useState<
    Array<DiagnosisIcd10Code> | undefined
  >(undefined)
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
      workingDiagnosis={diagnosisData}
      favouriteDiagnosis={favouritesData}
      patientId={patientId}
      appointmentId={appointmentId}
    />
  )
}

export { DischargeDiagnosisClientLoader }
