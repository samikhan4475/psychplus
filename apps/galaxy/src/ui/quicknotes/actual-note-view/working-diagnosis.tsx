'use client'

import { Text } from '@radix-ui/themes'
import { BlockContainer } from './shared'

const WorkingDiagnosis = () => {
  return (
    <BlockContainer heading="Working Diagnosis">
      <Text size="1">
        F32.9 Major depressive disorder, single episode, unspecified
      </Text>
      <Text size="1">
        F90.0 Attention-Deficit/Hyperactivity Disorder (ADHD)
      </Text>
    </BlockContainer>
  )
}

export { WorkingDiagnosis }
