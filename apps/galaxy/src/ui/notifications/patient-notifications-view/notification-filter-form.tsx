'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { DateValue, I18nProvider } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { CodesetSelect, DatePickerInput, FormContainer } from '@/components'
import { FormFieldLabel, FormSubmitButton } from '@/components/form'
import { CODESETS } from '@/constants'
import { formatDateToISOString } from '@/utils'
import { useStore } from './store'
import { removeEmptyValues } from './utils'

const SEARCH_FROM = 'search-from'
const SEARCH_TO = 'search-to'
const SEARCH_STATUS = 'search-status'
const SEARCH_SENT_VIA = 'search-sent-via'

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
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="row" align="center" gap="2" wrap="wrap">
        <Flex align="center" gap="2" className="max-w-[165px]">
          <FormFieldLabel id={SEARCH_FROM} className="w-[90px] font-bold">
            Start Date
          </FormFieldLabel>
          <I18nProvider locale="en-US">
            <DatePickerInput
              field="sentFrom"
              aria-label="date-from-filter-input"
            />
          </I18nProvider>
        </Flex>

        <Flex align="center" gap="2" className="max-w-[165px]">
          <FormFieldLabel id={SEARCH_TO} className="w-[90px] font-bold">
            End Date
          </FormFieldLabel>
          <I18nProvider locale="en-US">
            <DatePickerInput field="sentTo" aria-label="date-to-filter-input" />
          </I18nProvider>
        </Flex>

        <Flex align="center" gap="2">
          <FormFieldLabel id={SEARCH_STATUS} className="font-bold">
            Sent Via
          </FormFieldLabel>
          <CodesetSelect
            name="notificationMethod"
            codeset={CODESETS.NotificationChannel}
            size="1"
          />
        </Flex>

        <Flex align="center" gap="2">
          <FormFieldLabel id={SEARCH_SENT_VIA} className="font-bold">
            Status
          </FormFieldLabel>
          <CodesetSelect
            name="deliveryStatus"
            codeset={CODESETS.NotificationStatus}
            size="1"
          />
        </Flex>

        <Flex align="center" gap="2">
          <Button size="1" variant="outline" onClick={onClear} highContrast>
            Clear
          </Button>
          <FormSubmitButton form={form} size="1" highContrast>
            <Search size={16} />
          </FormSubmitButton>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { NotificationFilterForm }
