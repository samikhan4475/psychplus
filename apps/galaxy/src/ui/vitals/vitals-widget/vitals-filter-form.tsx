'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { ClearButton } from './buttons'
import { FromField, StatusSelect, ToField } from './filter-fields'
import { useStore, VitalsParams } from './store'
import { VitalsProps } from './types'

const schema = z.object({
  from: z.custom<DateValue>().nullable(),
  to: z.custom<DateValue>().nullable(),
  status: z.string().trim(),
})

type SchemaType = z.infer<typeof schema>

const VitalsFilterForm = ({
  patientId,
  appointmentId,
  quickNoteView = false,
}: VitalsProps & { quickNoteView?: boolean }) => {
  const { fetch, setIsFilterEnabled } = useStore((state) => ({
    fetch: state.fetch,
    setIsFilterEnabled: state.setIsFilterEnabled,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      from: undefined,
      to: undefined,
      status: '',
    },
  })

  useEffect(() => {
    const values = form.getValues()
    const hasFilters = Boolean(values.from || values.to || values.status)

    setIsFilterEnabled(hasFilters)
  }, [
    form.watch('from'),
    form.watch('to'),
    form.watch('status'),
    appointmentId,
    patientId,
  ])

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    if (data.from && data.to && data.to < data.from) {
      toast.error('To date must be greater than From date')
      return
    }

    const formattedData = {
      fromDateTime: formatDateToISOString(data.from),
      toDateTime: formatDateToISOString(data.to, true),
      appointmentId,
      patientId,
      recordStatuses: data.status ? [data.status] : [],
    }

    const cleanedData = sanitizeFormData(formattedData)
    return fetch(cleanedData as VitalsParams, quickNoteView)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5"
      form={form}
      onSubmit={onSubmit}
    >
      <FromField />
      <ToField />
      <StatusSelect />

      <ClearButton
        patientId={patientId}
        appointmentId={appointmentId}
        quickNoteView={quickNoteView}
      />

      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { VitalsFilterForm }
