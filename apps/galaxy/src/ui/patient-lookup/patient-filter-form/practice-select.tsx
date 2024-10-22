'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { PatientLookUpSchemaType } from './schema'

interface PracticeSelectProps {
  practicesOptions: SelectOptionType[]
}

const PracticeSelect = ({ practicesOptions }: PracticeSelectProps) => {
  const form = useFormContext<PatientLookUpSchemaType>()
  const practices = form.watch('practices')
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">Practice</FormFieldLabel>
      <MultiSelectField
        options={practicesOptions}
        defaultValues={practices}
        onChange={(values) => form.setValue('practices', values)}
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { PracticeSelect }
