'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { AddressInput } from './address-input'
import { ClearButton } from './clear-button'
import { CosignerSelect } from './cosigner-select'
import { CosignerTypeSelect } from './cosigner-type-select'
import { LocationIdInput } from './location-id'
import { LocationNameInput } from './location-name-input'
import { LocationTypeSelect } from './location-type-select'
import { MaxBookingFrequencySelect } from './max-booking-frequency-select'
import { PosInput } from './pos-input'
import { PrimaryProviderSelect } from './primary-provider-select'
import { serviceFiltersSchema, ServiceFiltersSchemaType } from './schema'
import { ServiceSelect } from './service-select'
import { StatusSelect } from './status-select'
import { SubmitButton } from './submit-button'
import { TaxonomySelect } from './taxonomy-select'
import { VisitTypeSelect } from './visit-type-select'

const FilterForm = () => {
  const { fetchServices } = useStore((state) => ({
    fetchServices: state.fetchServices,
  }))

  const form = useForm<ServiceFiltersSchemaType>({
    resolver: zodResolver(serviceFiltersSchema),
    defaultValues: {
      address: '',
      coSigner: '',
      coSignerType: '',
      id: '',
      locationName: '',
      locationType: '',
      maxBookingFrequency: '',
      pos: '',
      primaryProvider: '',
      recordStatuses: '',
      service: '',
      taxonomy: '',
      visitType: '',
    },
  })

  const onSubmit: SubmitHandler<ServiceFiltersSchemaType> = (data) => {
    return fetchServices(data, 1)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className={
        'bg-white flex flex-grow-0 flex-row flex-wrap items-center gap-2 rounded-1 p-2 shadow-2'
      }
      formClassName="flex-grow-0"
    >
      <LocationIdInput />
      <LocationTypeSelect />
      <LocationNameInput />
      <ServiceSelect />
      <PosInput />
      <PrimaryProviderSelect />
      <CosignerTypeSelect />
      <CosignerSelect />
      <MaxBookingFrequencySelect />
      <VisitTypeSelect />
      <AddressInput />
      <StatusSelect />
      <TaxonomySelect />
      <ClearButton />
      <SubmitButton />
    </FormContainer>
  )
}

export { FilterForm }
