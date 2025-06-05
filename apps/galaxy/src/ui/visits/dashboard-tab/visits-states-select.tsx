'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const VisitsStateSelect = () => {
  const options = useCodesetOptions(CODESETS.UsStates)

  const form = useFormContext()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">State</FormFieldLabel>
      <MultiSelectField
        defaultValues={form.watch('stateCodes') ?? []}
        onChange={(val) => form.setValue('stateCodes', val)}
        options={options}
      />
    </FormFieldContainer>
  )
}

export { VisitsStateSelect }
