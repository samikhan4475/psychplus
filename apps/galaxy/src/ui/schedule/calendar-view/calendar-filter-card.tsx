import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { startOfWeek } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { START_OF_WEEK_LOCALE } from '../constants'
import { useProviderId } from '../hooks'
import { CalenderViewSchemaType } from '../types'
import { getDateString, isDirty } from '../utils'
import { calenderViewSchema } from './calender-view-schema'
import { ClearFilterButton } from './clear-filter-button'
import {
  EndDateInput,
  GenderSelect,
  LanguageSelect,
  LocationDropdown,
  ProviderDropdown,
  ProviderTypeDropdown,
  ServiceDropdown,
  StartDateInput,
  StateSelect,
  VisitMediumDropdown,
} from './filter-fields'
import { HideFiltersButton } from './hide-filters-button'
import { SearchButton } from './search-button'
import { ShowFiltersButton } from './show-filters-button'
import { useStore } from './store'

const CalendarFilterCard = () => {
  const [isPartialFilterView, setIsPartialFilterView] = useState<boolean>(true)
  const { setStartDate, fetchData } = useStore((state) => ({
    setStartDate: state.setStartDate,
    fetchData: state.fetchData,
  }))
  const providerId = useProviderId()

  const form = useForm<CalenderViewSchemaType>({
    resolver: zodResolver(calenderViewSchema),
    criteriaMode: 'all',
    defaultValues: {
      startingDate: undefined,
      endingDate: undefined,
      stateIds: '',
      locationId: '',
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
      startingDate: getDateString(data.startingDate),
      endingDate: getDateString(data.endingDate),
      providerIds: data.providerIds ? [Number(data.providerIds)] : [],
      stateIds: data.stateIds ? [data.stateIds] : [],
    }
    if (data.startingDate) {
      const weekStartDate = startOfWeek(data.startingDate, START_OF_WEEK_LOCALE)
      setStartDate(weekStartDate)
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
          <StartDateInput />
          <EndDateInput />
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
