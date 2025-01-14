'use client'

import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { SelectOptionType } from '@/types'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'

const DurationSelect = () => {
  const form = useFormContext<SchemaType>()
  const [options, setOptions] = useState<SelectOptionType[]>([])
  const { visitTypes } = useEditVisitStore()
  const [selectedVisitType] = useWatch({
    name: ['visitType'],
    control: form.control,
  })

  useEffect(() => {
    if (!selectedVisitType) {
      if (options.length) setOptions([])
      return
    }
    const visitType = visitTypes.find(
      (type) => type.encouterType === selectedVisitType,
    )
    if (visitType?.visitDurations) {
      const durationOptions: SelectOptionType[] = visitType.visitDurations.map(
        (value) => ({
          value: `${value}`,
          label: `${value}`,
          disabled: false,
        }),
      )
      setOptions(durationOptions)
    }
  }, [selectedVisitType])

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Duration</FormFieldLabel>
      <SelectInput
        field="duration"
        options={options}
        buttonClassName="h-6 w-full"
      />
      <FormFieldError name="duration" />
    </FormFieldContainer>
  )
}

export { DurationSelect }
