'use client'

import { useEffect, useState } from 'react'
import { DiagnosisIcd10Code, QuickNoteSectionItem } from '@/types'
import { getIcd10DiagnosisAction } from '@/ui/diagnosis/client-actions'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type WorkingDiagnosisDetailProps = {
  data?: QuickNoteSectionItem[]
}

const WorkingDiagnosisClientView = ({
  data = [],
}: WorkingDiagnosisDetailProps) => {
  const [workingDiagnosisData, setWorkingDiagnosisData] = useState<
    DiagnosisIcd10Code[]
  >([])

  useEffect(() => {
    const { sectionItemValue } = data?.[0] || {}
    const diagnosis = sectionItemValue?.split(',') || []
    if (sectionItemValue === 'empty' || diagnosis?.length === 0) {
      setWorkingDiagnosisData([])
    } else {
      getIcd10DiagnosisAction({
        DiagnosisCodes: diagnosis,
      }).then((response) => {
        if (response.state === 'error') {
        return
        }
        setWorkingDiagnosisData(response?.data ?? [])
      })
    }
  }, [data])
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionDiagnosis}
    >
      <Details data={workingDiagnosisData} />
    </ActualNoteDetailsWrapper>
  )
}

export { WorkingDiagnosisClientView }
