'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from '@internationalized/date'
import { Box, Button, Dialog, Flex, Grid } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { TimeValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import {
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { WaitlistResponse } from '@/types/waitlists'
import {
  isLaterDate,
  isLaterTime,
  isWithinNextDays,
  sanitizeFormData,
} from '@/utils'
import { createWaitlistAction } from '../actions/create-waitlist-action'
import { updateWaitlistAction } from '../actions/update-waitlist-action'
import { useStore } from '../store'
import { transformIn, transformOut } from '../utils'
import {
  PriorityRadioField,
  RequestedDateField,
  RequestedTimeField,
} from './add-form-fields'
import VisitMediumSelectField from './add-form-fields/visit-medium-select-field'
import VisitTypeSelectField from './add-form-fields/visit-type-select-field'

interface AddWaitlistModalProps {
  isOpen?: boolean
  closeDialog?: () => void
  data?: WaitlistResponse
}

const Schema = z
  .object({
    serviceOffered: z.string().min(1, 'Required'),
    visitMedium: z.string().min(1, 'Required'),
    providerId: z.string().min(1, 'Required'),
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

type FormData = z.infer<typeof Schema>

const AddWaitlistModal = ({
  isOpen,
  closeDialog,
  data: waitlistData,
}: AddWaitlistModalProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(Schema),
    reValidateMode: 'onChange',
    defaultValues: {
      serviceOffered: '',
      providerId: '',
      fromTime: '',
      toTime: '',
      priority: '',
    },
  })

  const params = useParams()
  const patientId = params.id

  useEffect(() => {
    if (waitlistData) {
      const values = transformIn(waitlistData)
      form.reset(values)
    } else {
      form.reset()
    }
  }, [waitlistData])

  const [loading, setLoading] = useState(false)

  const { fetchWaitlists, providers, providerLoading, formValues } = useStore()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true)

    const patient = waitlistData ? waitlistData?.patientId : patientId

    const transformedData = transformOut({
      ...data,
      patientId: Number(patient),
      providerId: Number(data.providerId),
    })
    if (waitlistData) {
      transformedData.id = waitlistData.id
    }
    const sanitizedData = sanitizeFormData(transformedData)

    const response = await (waitlistData
      ? updateWaitlistAction
      : createWaitlistAction)(sanitizedData)

    if (response.state === 'error') {
      toast.error(response.error)
      setLoading(false)
      return
    }

    toast.success(
      waitlistData ? 'Updated successfully!' : 'Created successfully!',
    )

    const sanitizedFilterData = sanitizeFormData(formValues || {})
    patientId
      ? fetchWaitlists({
          ...sanitizedFilterData,
          patientIds: [Number(patientId)],
        })
      : fetchWaitlists(formValues)
    form.reset()
    closeDialog?.()
    setLoading(false)
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        closeDialog?.()
      }}
    >
      <Dialog.Content className="rounded-4 p-5">
        <Dialog.Title size="3" className="mb-2">
          <Flex align="center" gap="3">
            {waitlistData ? 'Update' : 'Add'} Waitlist
          </Flex>
        </Dialog.Title>
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <FormContainer
          className="justify-center gap-2 px-2 py-1"
          form={form}
          onSubmit={onSubmit}
        >
          <Grid columns="2" gap="2">
            <VisitTypeSelectField />
            <VisitMediumSelectField />
            <FormFieldContainer className="flex gap-1">
              <FormFieldLabel required>Provider</FormFieldLabel>
              <SelectInput
                field="providerId"
                buttonClassName={buttonClassName}
                options={providers}
                loading={providerLoading}
                disabled={!form.watch('serviceOffered')}
              />
              <FormFieldError name="providerId" />
            </FormFieldContainer>
            <PriorityRadioField />
            <RequestedDateField />
            <RequestedTimeField />
          </Grid>
          <Box className="flex justify-end ">
            <Button
              size="1"
              type="submit"
              className="w-min rounded-2"
              highContrast
              disabled={loading}
            >
              Save
            </Button>
          </Box>
        </FormContainer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-full'

export { AddWaitlistModal }
