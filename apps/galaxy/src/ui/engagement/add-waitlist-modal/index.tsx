'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from '@internationalized/date'
import { Button, Dialog, Flex } from '@radix-ui/themes'
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
  isDateValue,
  isLaterDate,
  isLaterTime,
  isWithinNextDays,
  sanitizeFormData,
} from '@/utils'
import { createWaitlistAction } from '../actions/create-waitlist-action'
import { updateWaitlistAction } from '../actions/update-waitlist-action'
import { WAITLIST_STATUS_CODESET } from '../constant'
import { useStore } from '../store'
import { transformIn, transformOut } from '../utils'
import {
  PriorityRadioField,
  RequestedDateField,
  RequestedTimeField,
} from './add-form-fields'
import VisitTypeSelectField from './add-form-fields/visit-type-select-field'

interface AddWaitlistModalProps {
  isOpen?: boolean
  closeDialog?: () => void
  patientId: string
  data?: WaitlistResponse
}

const Schema = z
  .object({
    visitTypeCode: z.string().min(1, 'required'),
    providerId: z.string().min(1, 'required'),
    waitingStatus: z.string().min(1, 'required'),
    priority: z.string().min(1, 'required'),
    fromDate: z.custom<DateValue>((val) => !!val && typeof val === 'object', {
      message: 'required',
    }),
    toDate: z.custom<DateValue>((val) => !!val && typeof val === 'object', {
      message: 'required',
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
  patientId,
  data: waitlistData,
}: AddWaitlistModalProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(Schema),
    reValidateMode: 'onChange',
    defaultValues: {
      visitTypeCode: '',
      providerId: '',
      waitingStatus: '',
      fromTime: '',
      toTime: '',
      priority: '',
    },
  })

  useEffect(() => {
    if (waitlistData) {
      const values = transformIn(waitlistData)
      Object.entries(values).forEach(([key, value]) => {
        form.setValue(`${key as keyof FormData}`, value)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitlistData])

  const [loading, setLoading] = useState(false)

  const { fetchWaitlists, providers, providerLoading } = useStore()

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
      console.log(response.error)
      setLoading(false)
      return
    }

    toast.success(
      waitlistData ? 'Updated successfully!' : 'Created successfully!',
    )

    patientId
      ? fetchWaitlists({ patientIds: [Number(patientId)] })
      : fetchWaitlists({})
    form.reset()
    closeDialog?.()
    setLoading(false)
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        form.reset()
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
          className="grid grid-cols-2 justify-center gap-2 px-2 py-1"
          form={form}
          onSubmit={onSubmit}
        >
          <VisitTypeSelectField />
          <PriorityRadioField />
          <RequestedDateField />
          <RequestedTimeField />
          <FormFieldContainer className="flex gap-1">
            <FormFieldLabel required>Provider</FormFieldLabel>
            <SelectInput
              field="providerId"
              buttonClassName={buttonClassName}
              options={providers}
              loading={providerLoading}
              disabled={!form.watch('visitTypeCode')}
            />
            <FormFieldError name="providerId" />
          </FormFieldContainer>
          <FormFieldContainer className="flex gap-1">
            <FormFieldLabel required>Waitlist Status</FormFieldLabel>
            <SelectInput
              field="waitingStatus"
              buttonClassName={buttonClassName}
              options={WAITLIST_STATUS_CODESET}
            />
            <FormFieldError name="waitingStatus" />
          </FormFieldContainer>
          <Button
            size="1"
            type="submit"
            className="col-start-2 w-min justify-self-end rounded-2"
            highContrast
            disabled={loading}
          >
            Save
          </Button>
        </FormContainer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-full'

export { AddWaitlistModal }
