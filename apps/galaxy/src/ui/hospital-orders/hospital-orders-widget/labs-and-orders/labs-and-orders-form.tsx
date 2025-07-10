import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { AutoResizeInput } from '@/components'
import { SaveButton } from '../save-button'

const LabsAndOrdersForm: React.FC = () => {
  return (
    <Flex width="100%" direction="column">
      <Text weight="medium">Add Info</Text>
      <Flex align="center" gap="2">
        <AutoResizeInput
          field="HospitalLabsOrders"
          className="w-full max-w-lg"
          maxLength={4000}
        />

        <SaveButton />
      </Flex>
    </Flex>
  )
}

export { LabsAndOrdersForm }
