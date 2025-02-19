'use client'

import { useEffect, useMemo, useState } from 'react'
import { TextField } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { NegativeVacationAlert } from '../../shared'
import { getCalculatedDuration } from '../../utils'
import { VacationSchemaType } from './schema'

const DurationInput = () => {
  const [alertOpen, setAlertOpen] = useState(false)
  const form = useFormContext<VacationSchemaType>()
  const [fromDate, fromTime, toDate, toTime] = useWatch({
    control: form.control,
    name: ['startDateTime', 'fromTime', 'endDateTime', 'toTime'],
  })

  const duration = useMemo(
    () => getCalculatedDuration(fromDate, toDate, fromTime, toTime),
    [fromDate, toDate, fromTime, toTime],
  )

  useEffect(() => {
    if (duration) {
      const { isNagtive, value } = duration
      if (isNagtive) {
        setAlertOpen(true)
      }
      form.setValue('duration', value, { shouldValidate: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel>Duration</FormFieldLabel>
      <TextField.Root size="1" {...form.register('duration')} disabled />
      <FormFieldError name="duration" />
      <NegativeVacationAlert
        alertOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </FormFieldContainer>
  )
}

export { DurationInput }
