'use client'

import { BlockContainer, LabelAndValue } from './shared'

const FamilyPsychiatricHx = () => {
  return (
    <BlockContainer heading="Family Psychiatric Hx">
      <LabelAndValue label="Bipolar Disorder:" value="Relationship: Brother" />
      <LabelAndValue
        label="Alcohol Use Disorder:"
        value="Relationship: Brother"
      />
    </BlockContainer>
  )
}

export { FamilyPsychiatricHx }
