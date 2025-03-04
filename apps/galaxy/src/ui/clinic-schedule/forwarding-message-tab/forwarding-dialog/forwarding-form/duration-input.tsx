'use client'

import { useEffect, useMemo } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getCalculatedDuration } from '../../utils'
import { ForwardingSchemaType } from './schema'

const DurationInput = () => {
  const form = useFormContext<ForwardingSchemaType>()
  const [startDateTime, fromTime, endDateTime, toTime] = useWatch({
    control: form.control,
    name: ['startDateTime', 'fromTime', 'endDateTime', 'toTime'],
  })

  const duration = useMemo(
    () => getCalculatedDuration(startDateTime, endDateTime, fromTime, toTime),
    [startDateTime, endDateTime, fromTime, toTime],
  )
  useEffect(() => {
    if (duration) {
      form.setValue('durationInDays', duration?.value, { shouldValidate: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Duration</FormFieldLabel>
      <TextField.Root size="1" disabled {...form.register('durationInDays')} />
      <FormFieldError name="durationInDays" className="text-[10.7px]" />
    </FormFieldContainer>
  )
}

export { DurationInput }
