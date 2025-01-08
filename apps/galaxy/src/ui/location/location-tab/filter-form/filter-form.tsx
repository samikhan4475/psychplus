'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { transformOutFilters } from '../transform'
import { getInitialValues } from '../utils'
import { ClearButton } from './clear-button'
import { IdInput } from './id-input'
import { LocationTypeSelect } from './location-type-select'
import { NameInput } from './name-input'
import { NpiInput } from './npi-input'
import { PhoneInput } from './phone-input'
import { LocationFormSchema, LocationFormSchemaType } from './schema'
import { StateSelect } from './state-select'
import { StatusSelect } from './status-select'
import { SubmitButton } from './submit-button'
import { ZipInput } from './zip-input'

const FilterForm = () => {
  const { fetchLocations, loading } = useStore((state) => ({
    error: state.error,
    fetchLocations: state.fetchLocations,
    loading: state.loading,
  }))

  const form = useForm<LocationFormSchemaType>({
    disabled: loading,
    resolver: zodResolver(LocationFormSchema),
    mode: 'onChange',
    defaultValues: getInitialValues(),
  })

  const onSubmit: SubmitHandler<LocationFormSchemaType> = (data) => {
    const payload = transformOutFilters(data)
    return fetchLocations(payload, 1, true)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white flex flex-row flex-wrap items-start gap-2 rounded-1 p-2 shadow-2"
    >
      <IdInput />
      <LocationTypeSelect />
      <NameInput />
      <StateSelect />
      <ZipInput />
      <NpiInput />
      <PhoneInput />
      <StatusSelect />
      <ClearButton />
      <SubmitButton />
    </FormContainer>
  )
}

export { FilterForm }
