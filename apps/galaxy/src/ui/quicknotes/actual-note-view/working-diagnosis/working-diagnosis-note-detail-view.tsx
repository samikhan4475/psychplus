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
      let DiagnosisCodes = sectionItemValue?.split(',') || []
      if (sectionItemValue === 'empty' || DiagnosisCodes?.length === 0) {
        DiagnosisCodes = []
      }
      const Icd10DiagnosisResponse = await getIcd10DiagnosisAction({
        DiagnosisCodes,
      })

      if (Icd10DiagnosisResponse.state === 'error') {
        return
      }
      setResponse(Icd10DiagnosisResponse.data)
    }
    fetchData()
  }, [])

  if (data.length === 0) return null
  return <Details data={response} />
}

export { WorkingDiagnosisNoteDetailView }
