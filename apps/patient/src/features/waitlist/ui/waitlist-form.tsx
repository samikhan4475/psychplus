'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from '@internationalized/date'
import { FormContainer } from '@psychplus-v2/components'
import {
  getLocalTime,
  getPaddedDateString,
  isLaterDate,
  isLaterTime,
  isWithinNextDays,
  sanitizeFormData,
} from '@psychplus-v2/utils'
import { Button, Dialog, Flex, Grid } from '@radix-ui/themes'
import { TimeValue } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { useToast } from '@/providers'
import { addWaitlist, updateWaitlist } from '../actions'
import { useStore } from '../store'
import { Waitlist } from '../types'
import { getDefaultValues, getStaffOptions } from '../utils'
import {
  PriorityRadioField,
  RequestedDateField,
  RequestedTimeField,
  VisitMediumSelectField,
  VisitTypeSelectField,
} from './form-fields'

const Schema = z
  .object({
    serviceOffered: z.string().min(1, 'Required'),
    providerId: z.string().min(1, 'Required'),
    visitMedium: z.string().min(1, 'Required'),
    priority: z.string().min(1, 'Required'),
    fromDate: z.custom<DateValue>((val) => !!val && typeof val === 'object', {
      message: 'Required',
    }),
    toDate: z.custom<DateValue>((val) => !!val && typeof val === 'object', {
      message: 'Required',
    }),
    fromTime: z.custom<TimeValue>().nullable(),
    toTime: z.custom<TimeValue>().nullable(),
  })
  .superRefine((data, ctx) => {
    const { fromDate, toDate, fromTime, toTime } = data

    if (fromDate && toDate && !isLaterDate(toDate, fromDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'To date must be later than From date',
        path: ['toDate'],
      })
    }

    if (fromTime && toTime && !isLaterTime(toTime, fromTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'To time must be later than From time',
        path: ['toTime'],
      })
    }

    if (fromDate && !isWithinNextDays(fromDate, 90)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'From date must be within 90 days from today',
        path: ['fromDate'],
      })
    }

    if (toDate && !isWithinNextDays(toDate, 90)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'To date must be within 90 days from today',
        path: ['toDate'],
      })
    }
  })

type WaitlistSchemaType = z.infer<typeof Schema>

interface WaitlistFormProps {
  data?: Waitlist
  setOpen: (open: boolean) => void
  setError: (error: string) => void
}

const WaitlistForm = ({ data, setOpen, setError }: WaitlistFormProps) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { providers, fetchWaitlists, page, providerLoading } = useStore()
  const patientId = useProfileStore((state) => state.profile.id)

  const form = useForm<WaitlistSchemaType>({
    resolver: zodResolver(Schema),
    reValidateMode: 'onChange',
    defaultValues: getDefaultValues(data),
  })

  const onSubmit = async () => {
    setLoading(true)
    const formValues = form.getValues()
    const payload = {
      id: data?.id || '',
      serviceOffered: formValues.serviceOffered,
      providerId: Number(formValues.providerId),
      visitMedium: formValues.visitMedium,
      priority: formValues.priority,
      fromDate: getPaddedDateString(formValues.fromDate),
      toDate: getPaddedDateString(formValues.toDate),
      fromTime: formValues.fromTime ? getLocalTime(formValues.fromTime) : '',
      toTime: formValues.toTime ? getLocalTime(formValues.toTime) : '',
      patientId,
    }

    const sanitizedPayload = sanitizeFormData(payload)

    const response = await (data ? updateWaitlist : addWaitlist)(
      sanitizedPayload,
    )

    if (response.state === 'error') {
      setError(response.error || 'Failed to save waitlist')
      setLoading(false)
      return
    }

    toast({
      title: `Waitlist ${data ? 'Updated' : 'Created'}`,
      type: 'success',
    })

    fetchWaitlists(page)
    form.reset({})
    setOpen(false)
    setLoading(false)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Grid columns="2" gap="3">
        <VisitTypeSelectField />
        <VisitMediumSelectField />
        <FormFieldContainer className="w-full">
          <FormFieldLabel required>Provider</FormFieldLabel>
          <CodesetFormSelect
            size="3"
            name="providerId"
            options={getStaffOptions(providers)}
            disabled={!form.watch('serviceOffered') || providerLoading}
          />
          <FormFieldError name="providerId" />
        </FormFieldContainer>
        <PriorityRadioField />
        <RequestedDateField />
        <RequestedTimeField />
      </Grid>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="outline" color="gray" disabled={loading} size="3">
            Cancel
          </Button>
        </Dialog.Close>
        <Button highContrast type="submit" disabled={loading} size="3">
          Confirm
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { WaitlistForm, type WaitlistSchemaType }
