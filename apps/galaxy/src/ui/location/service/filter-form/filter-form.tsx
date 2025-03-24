'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { transformOutServiceFilters } from '../transform'
import { getInitialFilterValues } from '../utils'
import { AddressInput } from './address-input'
import { ClearButton } from './clear-button'
import { CosignerSelect } from './cosigner-select'
import { CosignerTypeSelect } from './cosigner-type-select'
import { LocationNameInput } from './location-name-input'
import { LocationTypeSelect } from './location-type-select'
import { MaxBookingFrequencySelect } from './max-booking-frequency-select'
import { PosSelect } from './pos-select'
import { PrimaryProviderSelect } from './primary-provider-select'
import { serviceFiltersSchema, ServiceFiltersSchemaType } from './schema'
import { ServiceSelect } from './service-select'
import { StatusSelect } from './status-select'
import { SubmitButton } from './submit-button'
import { TaxonomySelect } from './taxonomy-select'
import { VisitTypeSelect } from './visit-type-select'

const FilterForm = () => {
  const { fetchServices, fetchCosigners } = useStore((state) => ({
    fetchServices: state.fetchServices,
    fetchCosigners: state.fetchCosigners,
  }))

  const form = useForm<ServiceFiltersSchemaType>({
    resolver: zodResolver(serviceFiltersSchema),
    defaultValues: getInitialFilterValues(),
  })

  const onSubmit: SubmitHandler<ServiceFiltersSchemaType> = (data) => {
    const payload = transformOutServiceFilters(data)
    return fetchServices(payload, 1, true)
  }
  useEffect(() => {
    fetchCosigners()
  }, [fetchCosigners])
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white flex flex-grow-0 flex-row flex-wrap items-center gap-2 rounded-1 p-2 shadow-2"
      formClassName="flex-grow-0"
    >
      <LocationTypeSelect />
      <LocationNameInput />
      <ServiceSelect />
      <PosSelect />
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
