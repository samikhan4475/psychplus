'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDate, getOptionalDateString, sanitizeFormData } from '@/utils'
import { useStore } from '../../store'
import { DOBDatePicker } from './dob-date-picker'
import { FirstNameInput } from './first-name-input'
import { LastNameInput } from './last-name-input'
import { MRNInput } from './mrn-input'
import { ResetButton } from './reset-button'
import { SubmitButton } from './submit-button'

const schema = z.object({
  mrn: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.custom<null | DateValue>().optional(),
})
type LinkAccountSchemaType = z.infer<typeof schema>

const LinkAccountForm = () => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const form = useForm<LinkAccountSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {},
  })
  const onSubmit: SubmitHandler<LinkAccountSchemaType> = (data) => {
    const payload = {
      ...data,
      dateOfBirth: getOptionalDateString(data.dateOfBirth),
    }
    const cleanedData = sanitizeFormData(payload)
    search(cleanedData)
  }
  return (
    <FormContainer
      className="flex flex-row gap-1 rounded-b-2 rounded-t-1 px-2 py-1"
      form={form}
      onSubmit={onSubmit}
    >
      <FirstNameInput />
      <LastNameInput />
      <DOBDatePicker />
      <MRNInput />
      <ResetButton />
      <SubmitButton />
    </FormContainer>
  )
}

export { LinkAccountForm, type LinkAccountSchemaType }
