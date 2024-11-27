'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { FromDateField } from './from-date-field'
import { ToDateField } from './to-date-field'
import { LicenseStatusSelect } from './visit-status-select'

const schema = z.object({
  dateFrom: z.custom<DateValue>(),
  dateTo: z.custom<DateValue>(),
  visitType: z.string().optional(),
  location: z.string().optional(),
  locationType: z.string().optional(),
  status: z.string().optional(),
  sign: z.string().optional(),
})
type LicenseHistorySchemaType = z.infer<typeof schema>

const FilterForm = () => {
  const form = useForm<LicenseHistorySchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
      status: '',
      sign: '',
    },
  })
  const onSubmit: SubmitHandler<LicenseHistorySchemaType> = () => {}
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
