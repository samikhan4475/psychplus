'use client'

import { Flex, TextArea, TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { PASTATUS } from '../types'
import { UpdateMedicationSchema } from './schema'

interface AuthorizationInformationProps {
  index: number
}
const AuthorizationInformation = ({ index }: AuthorizationInformationProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  return (
    <Flex gap="2">
      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Authorization Number </FormFieldLabel>
        <TextField.Root
          placeholder="Auth Number here"
          className="h-6 w-full "
          size="1"
          maxLength={300}
          {...form.register(`drugList.${index}.priorAuthorizationCode`)}
        />
      </FormFieldContainer>

      <FormFieldContainer className="flex-1">
        <FormFieldLabel>Authorization Status</FormFieldLabel>
        <SelectInput
          options={PASTATUS}
          name={`drugList.${index}.priorAuthorizationStatus`}
          buttonClassName="h-6 w-full"
          className="h-6 w-full"
          onValueChange={(e) =>
            form.setValue(`drugList.${index}.priorAuthorizationStatus`, e)
          }
        />
      </FormFieldContainer>
    </Flex>
  )
}

export { AuthorizationInformation }
