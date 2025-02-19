'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { ActiveVisitFilters } from '../types'
import { getInitialVisitFiltersValues } from '../utils'
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

interface ActiveVisitFormProps {
  filters: ActiveVisitFilters
}
const ActiveVisitForm = ({ filters }: ActiveVisitFormProps) => {
  const { fetchVisits } = useStore((state) => ({
    fetchVisits: state.fetchVisits,
  }))

  const form = useForm<ActiveVisitSchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: getInitialVisitFiltersValues(filters),
  })

  const onSubmit: SubmitHandler<ActiveVisitSchemaType> = async ({
    serviceId,
    locationId,
    ...data
  }) => {
    const payload = sanitizeFormData({
      serviceIds: serviceId ? [serviceId] : undefined,
      locationIds: locationId ? [locationId] : undefined,
      ...data,
    })
    return fetchVisits(payload, 1, true)
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit} className="bg-white">
      <Grid columns="8" gap="2" align="end">
        <NameInput />
        <GenderSelect />
        <AgeInput />
        <LocationSelect />
        <VisitServiceSelect />
        <VisitTypeSelect />
        <StatusSelect />
        <Flex gap="2" align="center" justify="end">
          <ClearButton filters={filters} />
          <SearchButton />
        </Flex>
      </Grid>
    </FormContainer>
  )
}

export { ActiveVisitForm }
