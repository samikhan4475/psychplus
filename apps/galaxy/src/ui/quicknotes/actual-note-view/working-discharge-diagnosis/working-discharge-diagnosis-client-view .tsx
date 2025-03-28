'use client'

import { useEffect, useState } from 'react'
import { DiagnosisIcd10Code, QuickNoteSectionItem } from '@/types'
import { getIcd10DiagnosisAction } from '@/ui/discharge-diagnosis/client-actions'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type WorkingDischargeDiagnosisClientViewProps = {
  data?: QuickNoteSectionItem[]
}

const WorkingDischargeDiagnosisClientView = ({
  data = [],
}: WorkingDischargeDiagnosisClientViewProps) => {
  const [workingDischangeDiagnosis, setWorkingDischangeDiagnosis] = useState<
    DiagnosisIcd10Code[]
  >([])

  useEffect(() => {
    const { sectionItemValue } = data?.[0] || {}
    const diagnosis = sectionItemValue?.split(',') || []
    if (sectionItemValue === 'empty' || diagnosis?.length === 0) {
      setWorkingDischangeDiagnosis([])
    } else {
      getIcd10DiagnosisAction({
        DiagnosisCodes: diagnosis,
      }).then((response) => {
        if (response.state === 'error') {
          return
        }
        setWorkingDischangeDiagnosis(response?.data ?? [])
      })
    }
  }, [data])
  return (
    <ActualNoteDetailsWrapper
      sectionName={
        QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis
      }
    >
      <Details data={workingDischangeDiagnosis} />
    </ActualNoteDetailsWrapper>
  )
}

export { WorkingDischargeDiagnosisClientView }
