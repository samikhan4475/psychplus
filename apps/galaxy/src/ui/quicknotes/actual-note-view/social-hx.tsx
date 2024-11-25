'use client'

import { BlockContainer, LabelAndValue } from './shared'

const SocialHx = () => {
  return (
    <BlockContainer heading="Social History">
      <LabelAndValue label="Relationship Status:" value="Single" />
      <LabelAndValue label="Professional Education:" value="In School" />
      <LabelAndValue label="Employed:" value="Yes" />
      <LabelAndValue label="Legal History:" value="Yes" />
      <LabelAndValue label="Living:" value="With Family" />
      <LabelAndValue label="Trauma Hx:" value="Emotional" />
    </BlockContainer>
  )
}

export { SocialHx }
