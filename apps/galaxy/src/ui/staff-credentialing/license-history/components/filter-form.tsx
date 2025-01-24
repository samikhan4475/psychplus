'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { LicenseStatus } from '../../types'
import { FromDateField } from './from-date-field'
import { LicenseStatusSelect } from './license-status-select'
import { ToDateField } from './to-date-field'

const schema = z.object({
  dateFrom: z.custom<DateValue>().optional(),
  dateTo: z.custom<DateValue>().optional(),
  status: z.nativeEnum(LicenseStatus).optional(),
})
type LicenseHistorySchemaType = z.infer<typeof schema>

const FilterForm = ({
  getHistory,
}: {
  getHistory: (filters: LicenseHistorySchemaType) => void
}) => {
  const form = useForm<LicenseHistorySchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
      status: undefined,
    },
  })
  const onSubmit: SubmitHandler<LicenseHistorySchemaType> = (filters) => {
    getHistory(filters)
  }
  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 py-1"
      form={form}
      onSubmit={onSubmit}
    >
      <FromDateField />
      <ToDateField />
      <LicenseStatusSelect />
      <Button
        color="gray"
        className="text-black"
        size="1"
        variant="outline"
        type="button"
        onClick={() => form.reset()}
      >
        Clear
      </Button>
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { FilterForm, type LicenseHistorySchemaType }
