import React from 'react'
import { Text } from '@radix-ui/themes'
import { FormFieldContainer, TextAreaInput } from '@/components'

const DiscontinueBlock = () => {
  return (
    <FormFieldContainer>
      <Text className="text-2 font-medium">Discontinue Treatment</Text>
      <TextAreaInput
        field="discontinueTreatmentDetail"
        className="h-full w-full"
      />
    </FormFieldContainer>
  )
}

export default DiscontinueBlock
