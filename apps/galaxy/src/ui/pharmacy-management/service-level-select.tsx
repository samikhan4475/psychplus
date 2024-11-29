'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { FilterSchemaType } from './filter-form'

interface ServiceSelectProps {
  label: string
}
const ServiceLevelSelect = ({ label }: ServiceSelectProps) => {
  const options = useCodesetOptions(CODESETS.ServiceLevelType)
  const form = useFormContext<FilterSchemaType>()
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel className="!text-1">{label}</FormFieldLabel>
      <MultiSelectField
        defaultValues={form.watch('serviceLevelCodes')}
        options={options}
        onChange={(values) => form.setValue('serviceLevelCodes', values)}
        className="w-[160px] flex-1"
      />
    </FormFieldContainer>
  )
}

export { ServiceLevelSelect }
