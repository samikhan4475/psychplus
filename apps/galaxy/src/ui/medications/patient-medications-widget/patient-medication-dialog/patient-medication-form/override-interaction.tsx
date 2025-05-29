'use client'

import { Flex, Text } from '@radix-ui/themes'
import { CheckboxInput } from '@/components'

const OverrideInteractionCheckbox = ({
  checked,
  onToggle,
}: {
  checked: boolean
  onToggle: () => void
}) => {
  return (
    <Text as="label" size="1" className="text-pp-black-3 font-bold">
      <Flex gap="1" align="center">
        <CheckboxInput
          field="isRequiresMedicalVisit"
          size="1"
          checked={checked}
          onCheckedChange={onToggle}
        />{' '}
        Override Interaction
      </Flex>
    </Text>
  )
}

export { OverrideInteractionCheckbox }
