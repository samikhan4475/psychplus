'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { VisitsSchemaType } from '../visits-filter-form'

const VisitIdField = () => {
  const form = useFormContext<VisitsSchemaType>()

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Visit ID</FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder=""
        className="border-pp-gray-2 h-6 w-[200px] border border-solid !outline-none [box-shadow:none]"
        {...form.register('appointmentId')}
      />
    </FormFieldContainer>
  )
}

export { VisitIdField }
