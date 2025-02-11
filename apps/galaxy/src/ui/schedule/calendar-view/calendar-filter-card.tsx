import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { useProviderId } from '../hooks'
import { CalenderViewSchemaType } from '../types'
import { isDirty } from '../utils'
import { calenderViewSchema } from './calender-view-schema'
import { ClearFilterButton } from './clear-filter-button'
import {
  DateRangeInput,
  GenderSelect,
  LanguageSelect,
  LocationDropdown,
  ProviderDropdown,
  ProviderTypeDropdown,
  ServiceDropdown,
  StateSelect,
  VisitMediumDropdown,
} from './filter-fields'
import { HideFiltersButton } from './hide-filters-button'
import { SearchButton } from './search-button'
import { ShowFiltersButton } from './show-filters-button'
import { useStore } from './store'

const CalendarFilterCard = () => {
  const [isPartialFilterView, setIsPartialFilterView] = useState<boolean>(true)
  const { fetchData } = useStore((state) => ({
    fetchData: state.fetchData,
  }))
  const providerId = useProviderId()

  const form = useForm<CalenderViewSchemaType>({
    resolver: zodResolver(calenderViewSchema),
    criteriaMode: 'all',
    defaultValues: {
      stateIds: [],
      locationIds: [],
      serviceIds: [],
      providerIds: providerId ?? '',
      visitMedium: '',
      providerType: '',
      gender: '',
      providerLanguage: '',
    },
  })

  const { dirtyFields } = form.formState

  const onSubmit: SubmitHandler<CalenderViewSchemaType> = async (data) => {
    if (!isDirty(dirtyFields)) return
    const transformedData = {
      ...data,
      providerIds: data.providerIds ? [Number(data.providerIds)] : [],
    }
    const sanitizedData = sanitizeFormData(transformedData)
    fetchData(sanitizedData)
  }

  const resetFilters = () => {
    if (!isDirty(dirtyFields)) return
    form.reset()
    if (providerId) {
      fetchData({ providerIds: [Number(providerId)] })
    }
  }

  const FilterButton = isPartialFilterView
    ? ShowFiltersButton
    : HideFiltersButton

  return (
    <Flex className="bg-white z-10 rounded-[4px] px-2.5 shadow-3">
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex className="sticky top-0" wrap="wrap" gap="2" align="start" py="1">
          <DateRangeInput />
          <StateSelect />
          <LocationDropdown />
          <ServiceDropdown />
          <ProviderDropdown />
          <VisitMediumDropdown />
          {isPartialFilterView && (
            <Flex gap="2">
              <FilterButton
                onClick={() => setIsPartialFilterView(!isPartialFilterView)}
              />
              <ClearFilterButton onClick={resetFilters} />
              <SearchButton />
            </Flex>
          )}
        </Flex>
        {!isPartialFilterView && (
          <Flex width="full" gap="2" py="1" align="start">
            <ProviderTypeDropdown />
            <GenderSelect />
            <LanguageSelect />
            <Flex className="flex-1" justify="end" gap="2" align="center">
              <FilterButton
                onClick={() => setIsPartialFilterView(!isPartialFilterView)}
              />
              <ClearFilterButton onClick={resetFilters} />
              <SearchButton />
            </Flex>
          </Flex>
        )}
      </FormContainer>
    </Flex>
  )
}

export { CalendarFilterCard }
