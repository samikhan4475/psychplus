import React from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { format } from 'date-fns'
import { DateValue, TimeValue } from 'react-aria-components'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { WaitlistPayload } from '@/types'
import { getLocalDateWithoutTime, getLocalTime } from '../schedule/utils'
import {
  AlertSelect,
  FromDateField,
  FromTimeField,
  InitiatedDateField,
  InitiatedTimeField,
  PatientNameField,
  ProviderSelect,
  ToDateField,
  ToTimeField,
  VisitTypeSelect,
  WaitlistStatusSelect,
} from './filter-form-fields'
import { ResetButton } from './reset-button'
import { useStore } from './store'
import { filterFalsey } from './utils'

const schema = z
  .object({
    initiatedFromDate: z.custom<DateValue>().optional(),
    initiatedFromTime: z.custom<TimeValue>().optional(),
    initiatedToDate: z.custom<DateValue>().optional(),
    initiatedToTime: z.custom<TimeValue>().optional(),
    serviceOffered: z.string().optional(),
    patientName: z.string().optional(),
    providerId: z.string().optional(),
    waitlistStatus: z.string().optional(),
    patientIds: z.string().optional(),
    dateRangeStart: z.custom<DateValue>().optional(),
    dateRangeEnd: z.custom<DateValue>().optional(),
    timeRangeStart: z.custom<TimeValue>().optional(),
    timeRangeEnd: z.custom<TimeValue>().optional(),
    isAlertSent: z.string().optional(),
  })
  .refine(
    (data) =>
      (!data.initiatedFromDate && !data.initiatedFromTime) ||
      (data.initiatedFromDate && data.initiatedFromTime),
    {
      message:
        'Both initiated from date and initiated from time must be provided together',
      path: ['initiatedFromDate'],
    },
  )
  .refine(
    (data) =>
      (!data.initiatedToDate && !data.initiatedToTime) ||
      (data.initiatedToDate && data.initiatedToTime),
    {
      message:
        'Both initiated to date and initiated to time must be provided together',
      path: ['initiatedToDate'],
    },
  )

const FilterForm = ({ isQuickNote }: { isQuickNote: boolean }) => {
  const form = useForm<WaitlistPayload>({
    defaultValues: {
      serviceOffered: '',
      patientName: '',
      timeRangeStart: '',
      timeRangeEnd: '',
    },
    resolver: zodResolver(schema),
  })

  const { setFormValues, fetchWaitlists } = useStore()

  const params = useParams()
  const patientId = params.id

  const onSubmit = async (data: WaitlistPayload) => {
    const initiatedDateRangeStart =
      (data?.initiatedFromDate || data?.initiatedFromTime) &&
      `${
        data?.initiatedFromDate
          ? getLocalDateWithoutTime(
              data?.initiatedFromDate as unknown as DateValue,
            )
          : format(new Date(), 'yyyy-MM-dd')
      }T${
        data?.initiatedFromTime
          ? getLocalTime(data?.initiatedFromTime as unknown as TimeValue)
          : '00:00:00'
      }`

    const initiatedDateRangeEnd =
      (data?.initiatedToDate || data?.initiatedToTime) &&
      `${
        data?.initiatedToDate
          ? getLocalDateWithoutTime(
              data?.initiatedToDate as unknown as DateValue,
            )
          : format(new Date(), 'MM-dd-yyyy')
      }T${
        data?.initiatedToTime
          ? getLocalTime(data?.initiatedToTime as unknown as TimeValue)
          : '23:59:59'
      }`

    const finalData = {
      ...data,
      waitlistStatus: data.waitlistStatus
        ? [
            ...(Array.isArray(data.waitlistStatus)
              ? data.waitlistStatus
              : [data.waitlistStatus]),
          ]
        : undefined,
      patientIds: patientId && [Number(patientId)],
      providerId: Number(data.providerId),
      dateRangeStart:
        data.dateRangeStart &&
        (getLocalDateWithoutTime(
          data.dateRangeStart as unknown as DateValue,
        ) as string),
      dateRangeEnd:
        data.dateRangeEnd &&
        (getLocalDateWithoutTime(
          data.dateRangeEnd as unknown as DateValue,
        ) as string),
      timeRangeStart:
        data.timeRangeStart &&
        (getLocalTime(data.timeRangeStart as unknown as TimeValue) as string),
      timeRangeEnd:
        data.timeRangeEnd &&
        (getLocalTime(data.timeRangeEnd as unknown as TimeValue) as string),
      isAlertSent: data.isAlertSent && data.isAlertSent === 'true',
      initiatedDateRangeStart,
      initiatedDateRangeEnd,
    }
    const filteredData = filterFalsey(finalData)
    setFormValues(filteredData)
    await fetchWaitlists(filteredData)
  }

  return (
    <FormContainer
      className="bg-white flex-row flex-wrap gap-2 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      {!isQuickNote && <PatientNameField />}
      <VisitTypeSelect />
      <FromDateField />
      <ToDateField />
      <FromTimeField />
      <ToTimeField />
      <ProviderSelect />
      <InitiatedDateField />
      <InitiatedTimeField />
      <WaitlistStatusSelect />
      {!isQuickNote && <AlertSelect />}
      <ResetButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export default FilterForm
