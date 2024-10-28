'use client'

import { BlockContainer, LabelAndValue } from './shared'

const PresentingSymptoms = () => {
  return (
    <BlockContainer heading="HPI/Presenting Symptoms">
      <LabelAndValue
        label="Chief Complaint:"
        value="Depression, ADHD, PTSD, Schizophrenia"
      />
      <LabelAndValue label="Depression:" value="Sleep Concerns, Low Interest" />
      <LabelAndValue
        label="Mania:"
        value="Goal Directed, Impulsive/Reckless Behavior"
      />
      <LabelAndValue label="Substance:" value="Other: Suicide thoughts" />
    </BlockContainer>
  )
}

export { PresentingSymptoms }
