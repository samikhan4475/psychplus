'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { AddRelationshipSchemaType } from './add-relationship-form'
import { MOTHER_CODESET_CODE } from './schema'

const MaidentNameInput = () => {
  const form = useFormContext<AddRelationshipSchemaType>()

  const selectedRelationship = form.watch('relationship')

  if (selectedRelationship !== MOTHER_CODESET_CODE) return null
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1" required>
        Maiden Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        {...form.register('maidenName')}
      />
      <FormFieldError name="maidenName" />
    </FormFieldContainer>
  )
}

export { MaidentNameInput }
