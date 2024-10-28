'use client'

import { BlockContainer, LabelAndValue } from './shared'

const MentalStatusExam = () => {
  return (
    <BlockContainer heading="Mental Status Exam">
      <LabelAndValue label="Appearance:" value="Disheveled, Bad order" />
      <LabelAndValue
        label="Behavior:"
        value="Uncooperative, Poor eye contact"
      />
      <LabelAndValue label="Psychomotor:" value="Slowing, Agitation" />
      <LabelAndValue
        label="Thought Content:"
        value="Sits, Yes; Hx, Yes; Delusions: Yes; Hallucinations: Yes"
      />
      <LabelAndValue
        label="Memory:"
        value="Recent Intact: Yes; Remote Intact: Yes"
      />
    </BlockContainer>
  )
}

export { MentalStatusExam }
