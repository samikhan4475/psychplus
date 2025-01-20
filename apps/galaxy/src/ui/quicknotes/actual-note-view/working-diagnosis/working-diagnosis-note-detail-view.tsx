'use client'

import { useEffect, useState } from 'react'
import { DiagnosisIcd10Code } from '@/types'
import { getIcd10DiagnosisAction } from '@/ui/diagnosis/actions/get-icd-10-diagnosis'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const WorkingDiagnosisNoteDetailView = ({ data }: NoteDetailProps) => {
  const [response, setResponse] = useState<DiagnosisIcd10Code[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { sectionItemValue } = data?.[0] || {}
      const diagnosis = sectionItemValue?.split(',') || []
      if (sectionItemValue === 'empty' || diagnosis?.length === 0) {
        setResponse([])
      } else {
        getIcd10DiagnosisAction({
          DiagnosisCodes: diagnosis,
        }).then((response) => {
          if (response.state === 'error') {
            return
          }
          setResponse(response?.data ?? [])
        })
      }
    }
    fetchData()
  }, [data])

  if (data.length === 0) return null
  return <Details data={response} />
}

export { WorkingDiagnosisNoteDetailView }
