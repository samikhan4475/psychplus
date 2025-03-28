'use client'

import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { DiagnosisIcd10Code } from '@/types'
import { getIcd10DiagnosisAction } from '@/ui/discharge-diagnosis/client-actions'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const WorkingDischargeDiagnosisNoteDetailView = ({
  data: diagnosisData,
}: NoteDetailProps) => {
  const [data, setData] = useState<DiagnosisIcd10Code[]>([])
  const { sectionItemValue } = diagnosisData?.[0] || {}
  const diagnosis = useMemo(() => {
    return (
      (sectionItemValue === 'empty' ? [] : sectionItemValue?.split(',')) ?? []
    )
  }, [sectionItemValue])

  useEffect(() => {
    if (diagnosis?.length === 0) {
      setData([])
    } else {
      getIcd10DiagnosisAction({
        DiagnosisCodes: diagnosis,
      }).then((response) => {
        if (response.state === 'error') {
          return toast.error(response?.error)
        }
        setData(response?.data ?? [])
      })
    }
  }, [data, diagnosis])

  if (data?.length === 0) return null

  return <Details data={data} />
}

export { WorkingDischargeDiagnosisNoteDetailView }
