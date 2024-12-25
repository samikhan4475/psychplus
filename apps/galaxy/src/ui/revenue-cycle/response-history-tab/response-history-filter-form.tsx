'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { ResponseHistoryPayload } from '../types'
import { ClearButton } from './clear-button'
import { CreatedOnField } from './created-on-field'
import { ReceiverNameField } from './receiver-name-field'
import { useStore } from './store'

const schema = z.object({
  createdOn: z.custom<DateValue>().nullable(),
  receiverId: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

const ResponseHistoryFilterForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      createdOn: undefined,
      receiverId: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const sanitizedData = sanitizeFormData({
      ...data,
      createdOn: data.createdOn
        ? formatDateToISOString(data.createdOn as DateValue)
        : undefined,
    }) as ResponseHistoryPayload
    search(sanitizedData, 1, true)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <ReceiverNameField />
      <CreatedOnField />
      <ClearButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { ResponseHistoryFilterForm, type SchemaType }
