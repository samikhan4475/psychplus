'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { AgeInput } from './age-input'
import { ClearButton } from './clear-button'
import { GenderSelect } from './gender-select'
import { LocationSelect } from './location-select'
import { NameInput } from './name-input'
import { ActiveVisitSchemaType, schema } from './schema'
import { SearchButton } from './search-button'
import { StatusSelect } from './status-select'
import { VisitServiceSelect } from './visit-service-select'
import { VisitTypeSelect } from './visit-type-select'

const ActiveVisitForm = () => {
  const form = useForm<ActiveVisitSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      gender: '',
      age: '',
      visitService: '',
      visitType: '',
      status: '',
      location: '',
    },
  })

  const onSubmit: SubmitHandler<ActiveVisitSchemaType> = (data) => {
    console.log(data)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white !flex-row items-end gap-2"
    >
      <NameInput />
      <GenderSelect />
      <AgeInput />
      <VisitServiceSelect />
      <VisitTypeSelect />
      <StatusSelect />
      <LocationSelect />
      <ClearButton />
      <SearchButton />
    </FormContainer>
  )
}

export { ActiveVisitForm }
