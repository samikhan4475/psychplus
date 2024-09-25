'use client'

import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components'

const PatientPolicyCheckbox = () => {
  return (
    <FormFieldLabel>
      <Flex gap="1">
        <Checkbox defaultChecked disabled size="1" highContrast />
        <Text size="1" className="text-pp-black-3" weight="medium">
          Patient Policy A
        </Text>
      </Flex>
    </FormFieldLabel>
  )
}

export { PatientPolicyCheckbox }
