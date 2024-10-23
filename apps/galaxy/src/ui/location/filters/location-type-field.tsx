'use client'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components/form'
import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useFormContext } from 'react-hook-form'
import { FormSchemaType } from '../form-schema'

const LocationTypeField = () => {
  const form = useFormContext<FormSchemaType>()

  return (
    <FormFieldContainer className="flex flex-row gap-1">
      <FormFieldLabel required>Location Type</FormFieldLabel>
      <CodesetSelect
        className="w-[120px]"
        codeset={CODESETS.LocationType}
        size="1"
        placeholder="Select Type"
        {...form.register('locationType')}
      />
      <FormFieldError name="locationType" />
    </FormFieldContainer>
  )
}

export { LocationTypeField }