'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { StaffHistoryPayload } from '../../types'
import { FromDateField } from './from-date-field'
import { ResetButton } from './reset-button'
import { useStore } from './store'
import { ToDateField } from './to-date-field'
import { UserNameField } from './user-name-field'

const schema = z.object({
  historyCreatedFrom: z.custom<DateValue>().nullable(),
  historyCreatedTo: z.custom<DateValue>().nullable(),
  createdById: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const FilterForm = () => {
  const { search, staffId } = useStore((state) => ({
    search: state.search,
    staffId: state.staffId,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      historyCreatedFrom: undefined,
      historyCreatedTo: undefined,
      createdById: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      historyCreatedFrom: formatDateToISOString(data.historyCreatedFrom),
      historyCreatedTo: formatDateToISOString(data.historyCreatedTo, true),
    }
    const cleanedData = sanitizeFormData(formattedData) as StaffHistoryPayload
    return search(staffId as string, cleanedData)
  }

  return (
    <FormContainer
      className="bg-white mb-4 flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1"
      form={form}
      onSubmit={onSubmit}
    >
      <FromDateField />
      <ToDateField />
      <UserNameField />
      <ResetButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { FilterForm, type SchemaType }
