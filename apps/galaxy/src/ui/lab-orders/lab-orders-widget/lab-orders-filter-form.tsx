'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString } from '@/utils'
import { CptCodeField } from './cpt-code-field'
import { LocationSelect } from './location-select'
import { OrderBySelect } from './order-by-select'
import { OrderDateField } from './order-date-field'
import { StatusSelect } from './status-select'
import { TestField } from './test-field'

const schema = z.object({
  orderDate: z.custom<DateValue | null>().nullable(),
  orderBy: z.string().optional(),
  test: z.string().trim().optional(),
  location: z.string().optional(),
  status: z.string().optional(),
  cptCode: z.string().trim().optional(),
})

export type SchemaType = z.infer<typeof schema>

const LabOrdersFilterForm = () => {
  const { id } = useParams<{ id: string }>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      orderDate: undefined,
      orderBy: '',
      test: '',
      location: '',
      status: '',
      cptCode: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      orderDate: null,
      orderBy: '',
      test: '',
      location: '',
      status: '',
      cptCode: '',
    })
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const _formattedData = {
      ...data,
      orderDate: formatDateToISOString(data.orderDate),
      patientId: id,
    }
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <OrderDateField />
      <OrderBySelect />
      <LocationSelect />
      <TestField />
      <CptCodeField />
      <StatusSelect />

      <Button
        color="gray"
        className="text-black"
        size="1"
        variant="outline"
        type="button"
        onClick={onClear}
      >
        Clear
      </Button>
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { LabOrdersFilterForm }
