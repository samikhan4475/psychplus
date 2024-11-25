'use client'

import { BlockContainer, LabelAndValue } from './shared'

const SubstanceUseHx = () => {
  return (
    <BlockContainer heading="Substance Use History">
      <LabelAndValue label="Tobacco:" value="Yes" />
      <LabelAndValue
        label="Smoke:"
        value="Start Date: 03/12/24, End Date: 03/12/24"
      />
      <LabelAndValue label="Status:" value="Active" />
    </BlockContainer>
  )
}

export { SubstanceUseHx }
