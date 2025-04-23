'use client'

import { useEffect, useMemo } from 'react'
import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { DrugBlockProps } from '../../types'
import { getFieldName } from '../../utils'
import { EndDateTimeInput } from './end-date-time-input'
import { PatientMedicationSchemaType } from './schema'

const EndDateTime = ({ index }: DrugBlockProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const startDateField = getFieldName(index, 'startDateTime')
  const endDateField = getFieldName(index, 'endDateTime')
  const durationField = getFieldName(index, 'duration')
  const endTimeField = getFieldName(index, 'endTime')

  const currentTime = useMemo(
    () =>
      new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    [],
  )
  useEffect(() => {
    const startDate = form.watch(startDateField)
    const duration = parseInt(form.watch(durationField) ?? '', 10)
    if (!duration || isNaN(duration)) {
      form.setValue(endDateField, '')
      form.setValue(endTimeField, '')
      return
    }
    if (startDate && duration && !isNaN(duration)) {
      const newEndDate = new Date(startDate)
      newEndDate.setDate(newEndDate.getDate() + duration)
      const endDate = newEndDate.toISOString().split('T')[0]

      form.setValue(endDateField, endDate)
      form.setValue(endTimeField, currentTime)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch(startDateField), form.watch(durationField)])

  return (
    <FormFieldContainer className="flex-1 flex-row gap-2">
      <Flex direction="column" gap="1">
        <FormFieldLabel required>End Date & time</FormFieldLabel>
        <TextField.Root
          type="date"
          size="1"
          {...form.register(endDateField)}
          className="border-pp-gray-2 h-7 w-full  border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
          disabled
        />
        <FormFieldError name={endDateField} />
      </Flex>
      <EndDateTimeInput index={index} />
    </FormFieldContainer>
  )
}

export { EndDateTime }
