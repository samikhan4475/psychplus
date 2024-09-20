'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, TextField } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { DateValue, I18nProvider } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { CodesetSelect, DatePickerInput, FormContainer } from '@/components'
import { FormFieldLabel, FormSubmitButton } from '@/components/form'
import { CODESETS } from '@/constants'
import { formatDateToISOString } from '@/utils'

const schema = z.object({
  sentFrom: z.custom<DateValue>().nullable(),
  sentTo: z.custom<DateValue>().nullable(),
  user: z.string().trim(),
})

type SchemaType = z.infer<typeof schema>

const HxFilterForm = ({ patientId }: { patientId: string }) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      sentFrom: undefined,
      sentTo: undefined,
      user: '',
    },
  })

  const onClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    form.reset({
      sentFrom: null,
      sentTo: null,
      user: '',
    })
    return []
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      sentFrom: formatDateToISOString(data.sentFrom),
      sentTo: formatDateToISOString(data.sentTo, true),
      patientId: patientId,
    }
    console.log('🚀 ~ HxFilterForm ~ formattedData:', formattedData)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="row" align="center" gap="2" wrap="wrap" className="pb-3">
        <Flex align="center" gap="1">
          <FormFieldLabel className="w-[90px] font-bold">
            From Date
          </FormFieldLabel>
          <I18nProvider locale="en-US">
            <DatePickerInput
              field="sentFrom"
              aria-label="date-from-filter-input"
            />
          </I18nProvider>
        </Flex>

        <Flex align="center" gap="1">
          <FormFieldLabel className="w-[90px] font-bold">
            To Date
          </FormFieldLabel>
          <I18nProvider locale="en-US">
            <DatePickerInput field="sentTo" aria-label="date-to-filter-input" />
          </I18nProvider>
        </Flex>

        <Flex align="center" gap="1">
          <FormFieldLabel>User</FormFieldLabel>
          <TextField.Root
            placeholder="user"
            size={'1'}
            {...form.register('user')}
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

export { HxFilterForm }
