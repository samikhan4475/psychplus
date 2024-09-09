'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const ZipCodeField = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel required>Zip Code</FormFieldLabel>
      <TextField.Root
        placeholder="Zip code"
        size={'1'}
        className={textFieldclass}
        {...form.register('postalCode')}
      />
      <FormFieldError name="postalCode" />
    </FormFieldContainer>
  )
}
const textFieldclass =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { ZipCodeField }
