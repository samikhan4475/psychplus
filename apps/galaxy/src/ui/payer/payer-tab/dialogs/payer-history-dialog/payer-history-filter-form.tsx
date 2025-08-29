'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import {
  PayerAuditHistoryFilterFormProps,
  PayerAuditHistoryPayload,
} from '@/ui/payer/types'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { ClearButton } from './clear-button'
import { FromDateField } from './from-date-field'
import { ToDateField } from './to-date-field'

const schema = z.object({
  dateFrom: z.custom<DateValue>().nullable(),
  dateTo: z.custom<DateValue>().nullable(),
})

type SchemaType = z.infer<typeof schema>

const PayerHistoryFilterForm = ({
  onFilterSubmit,
}: PayerAuditHistoryFilterFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const payload = {
      fromDateTime: formatDateToISOString(data.dateFrom),
      toDateTime: formatDateToISOString(data.dateTo),
    }
    const payloadSanitized = sanitizeFormData(
      payload,
    ) as PayerAuditHistoryPayload
    onFilterSubmit(payloadSanitized)
  }

  return (
    <FormContainer
      className="bg-white mb-2 flex-row gap-1.5 px-2 py-1"
      form={form}
      onSubmit={onSubmit}
    >
      <FromDateField />
      <ToDateField />
      <ClearButton onFilterSubmit={onFilterSubmit} />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { PayerHistoryFilterForm, type SchemaType }
