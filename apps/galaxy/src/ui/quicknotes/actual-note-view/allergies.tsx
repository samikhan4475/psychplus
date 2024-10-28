'use client'

import { Text } from '@radix-ui/themes'
import { BlockContainer } from './shared'

const Allergies = () => {
  return (
    <BlockContainer heading="Allergies">
      <Text size="1">
        Penicillin | Drug class | Shortness of breath | Mild | Active | 02/12/24
      </Text>
      <Text size="1">
        Penetrex | Specific Drug Allergy | Shortness of breath | Mild | Active |
        02/12/24
      </Text>
    </BlockContainer>
  )
}

export { Allergies }
