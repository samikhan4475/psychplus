'use client'

import { Strong } from '@radix-ui/themes'
import { BlockContainer, LabelAndValue } from './shared'

const Question = () => {
  return (
    <BlockContainer heading="Question PHQ 9" subHeading="PHQ 9">
      <LabelAndValue
        label="Score 8:"
        value={
          <>
            Completed on 03/25/24 09:27 by <Strong>Provider</Strong>
          </>
        }
      />
      <LabelAndValue
        label="Score 12:"
        value={
          <>
            Completed on 03/25/24 09:27 by <Strong>Patient</Strong>
          </>
        }
      />
      <LabelAndValue
        label="Score 8:"
        value={
          <>
            Completed on 03/25/24 09:27 by <Strong>Provider</Strong>
          </>
        }
      />
    </BlockContainer>
  )
}

export { Question }
