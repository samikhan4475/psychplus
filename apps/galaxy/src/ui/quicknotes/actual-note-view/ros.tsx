'use client'

import { BlockContainer, LabelAndValue } from './shared'

const ReviewOfSystem = () => {
  return (
    <BlockContainer heading="ROS (Review of System)">
      <LabelAndValue label="Constitutional:" value="Weight Change, Fever" />
      <LabelAndValue
        label="ENMT:"
        value="Hearing Changes/Ear Pain, Sinus Congestion"
      />
      <LabelAndValue label="Eyes:" value="Eye Pain, Shortness of Breath" />
      <LabelAndValue
        label="Cardiovascular:"
        value="Chest Pain, Shortness of Breath"
      />
    </BlockContainer>
  )
}

export { ReviewOfSystem }
