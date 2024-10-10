import React from 'react'
import { Box, Flex, Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SaveButton } from '../save-button'
import { HospitalWidgetSchemaType } from './schema'

const LabsAndOrdersForm: React.FC = () => {
  const form = useFormContext<HospitalWidgetSchemaType>()

  return (
    <Flex width="100%" direction="column">
      <Text weight="medium">Add Info</Text>
      <Flex align="center" gap="2">
        <Box width="500px">
          <TextField.Root size="1" {...form.register('HospitalLabsOrders')} />
        </Box>
        <SaveButton />
      </Flex>
    </Flex>
  )
}

export { LabsAndOrdersForm }
