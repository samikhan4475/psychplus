'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString } from '@/utils'
import { SentFromField } from './sent-from-field'
import { SentToField } from './sent-to-field'
import { SentViaSelect } from './sent-via-select'
import { StatusSelect } from './status-select'
import { useStore } from './store'
import { removeEmptyValues } from './utils'

const schema = z.object({
  sentFrom: z.custom<DateValue>().nullable(),
  sentTo: z.custom<DateValue>().nullable(),
  deliveryStatus: z.string().trim(),
  notificationMethod: z.string().trim(),
})

type SchemaType = z.infer<typeof schema>

const NotificationFilterForm = ({ patientId }: { patientId: string }) => {
  const { search } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      sentFrom: undefined,
      sentTo: undefined,
      deliveryStatus: '',
      notificationMethod: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      sentFrom: null,
      sentTo: null,
      deliveryStatus: '',
      notificationMethod: '',
    })
    return search({ patientId: patientId })
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      sentFrom: formatDateToISOString(data.sentFrom),
      sentTo: formatDateToISOString(data.sentTo, true),
      patientId: patientId,
    }

    const cleanedData = removeEmptyValues(formattedData)
    return search(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <SentFromField />
      <SentToField />
      <SentViaSelect />
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

export { NotificationFilterForm }
