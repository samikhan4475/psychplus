'use client'

import { useMemo } from 'react'
import { SelectInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { generateTimeIntervals } from '@/ui/visit/add-visit/util'

const TimeSelect = ({ label, field }: { label: string; field: string }) => {
  const options = useMemo(() => {
    const timeSlots = generateTimeIntervals()
    return timeSlots.map((v) => ({
      label: v.label,
      value: v.value,
    }))
  }, [])

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>{label}</FormFieldLabel>
      <SelectInput field={field} options={options} buttonClassName="flex-1" />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { TimeSelect }
