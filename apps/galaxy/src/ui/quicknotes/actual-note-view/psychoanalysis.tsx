'use client'

import { BlockContainer, LabelAndValue } from './shared'

const Psychoanalysis = () => {
  return (
    <BlockContainer heading="Psychoanalysis">
      <LabelAndValue label="Description of transference :" value="Negative" />
      <LabelAndValue
        label="Psychoanalytic Technique :"
        value="Transference Analysis"
      />
    </BlockContainer>
  )
}

export { Psychoanalysis }
