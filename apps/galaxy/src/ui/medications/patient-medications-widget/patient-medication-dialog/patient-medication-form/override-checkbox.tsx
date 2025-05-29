'use client'

import { Flex, Text } from '@radix-ui/themes'
import { CheckboxInput } from '@/components'

const OverRideCheckbox = ({onToggle,checked}:{onToggle:()=>void,checked:boolean}) => {
  return (
    <Text as="label" size="1" className="text-pp-black-3 font-medium">
      <Flex gap="1" align="center">
        <CheckboxInput field="isRequiresMedicalVisit" size="1" highContrast onCheckedChange={onToggle} checked={checked} />
        Override All
      </Flex>
    </Text>
  )
}

export { OverRideCheckbox }
