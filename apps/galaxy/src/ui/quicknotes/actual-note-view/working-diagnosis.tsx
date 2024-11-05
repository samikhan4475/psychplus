'use client'

import { Text } from '@radix-ui/themes'
import { useStore } from '@/ui/diagnosis/store'
import { BlockContainer } from './shared'

const WorkingDiagnosis = () => {
  const { workingDiagnosisData } = useStore()

  return (
    <BlockContainer heading="Working Diagnosis">
      {workingDiagnosisData.map((diagnosis) => {
        return <Text key={diagnosis.id} size="1">{diagnosis.sectionItemValue}</Text>
      })}
    </BlockContainer>
  )
}

export { WorkingDiagnosis }
