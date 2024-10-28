'use client'

import { BlockContainer, LabelAndValue } from './shared'

const PsychiatricEvaluation = () => {
  return (
    <BlockContainer heading="Psychiatric Evaluation">
      <LabelAndValue label="Title:" value="Psychiatric Evaluation" />
      <LabelAndValue label="Visit Type:" value="Outpatient Office Visit" />
      <LabelAndValue label="Visit Sequence:" value="Initial" />
      <LabelAndValue label="Visit Medium:" value="In-Person" />
      <LabelAndValue label="Provider Type:" value="Therapy" />
      <LabelAndValue label="Provider:" value="John Smith, MD" />
      <LabelAndValue label="Location:" value="Willow Brooks" />
      <LabelAndValue label="Service:" value="Willow Brooks" />
      <LabelAndValue label="Date:" value="11/22/24" />
      <LabelAndValue label="Time:" value="00:00" />
      <LabelAndValue label="Duration:" value="20 mins" />
      <LabelAndValue label="Patient:" value="Ross Galler" />
      <LabelAndValue label="DOB:" value="11/21/2024" />
      <LabelAndValue label="Cosigner:" value="John Smith, MD" />
      <LabelAndValue label="Visit #:" value="0000198" />
    </BlockContainer>
  )
}

export { PsychiatricEvaluation }
