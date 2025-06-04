'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormContainer } from '@/components'
import { getOptionalDateString, sanitizeFormData } from '@/utils'
import { useLinkAccountStore } from '../store'
import { linkAccountSchema, LinkAccountSchemaType } from '../types'
import { DOBDatePicker } from './dob-date-picker'
import { FirstNameInput } from './first-name-input'
import { LastNameInput } from './last-name-input'
import { MRNInput } from './mrn-input'
import { ResetButton } from './reset-button'
import { SubmitButton } from './submit-button'

const LinkAccountForm = () => {
  const { search } = useLinkAccountStore((state) => ({
    search: state.search,
  }))
  const form = useForm<LinkAccountSchemaType>({
    resolver: zodResolver(linkAccountSchema),
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

export { LinkAccountForm }
