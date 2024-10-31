'use client'

import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const WebsiteField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Website</FormFieldLabel>
      <TextInput field="website" className="w-full" />
      <FormFieldError name="website" />
    </FormFieldContainer>
  )
}

export { WebsiteField }
