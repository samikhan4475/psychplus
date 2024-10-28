'use client'

import { Text } from '@radix-ui/themes'
import { BlockContainer } from './shared'

const PsychiatristPlan = () => {
  return (
    <BlockContainer heading="Psychiatrist Assessment/Plan">
      <Text size="1">
        Teach Sarah grounding exercises to help her stay centered and calm
        amidst chaos. Techniques such as deep breathing, visualization, or
        mindfulness can be effective.
      </Text>
      <Text size="1">
        Treatment/Therapy options, labs, medications risks/SE, safety plan, &
        emergency procedures discussed with the patient: Yes
      </Text>
    </BlockContainer>
  )
}

export { PsychiatristPlan }
