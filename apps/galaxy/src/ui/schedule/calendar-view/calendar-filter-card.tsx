import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { useBookedAppointmentsStore } from '../store'
import { CalenderViewSchemaType, View } from '../types'
import { getDateString, isDirty } from '../utils'
import { calenderViewSchema } from './calender-view-schema'
import { ClearFilterButton } from './clear-filter-button'
import {
  EndDateInput,
  FirstResponderSelect,
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
import { startOfWeek } from '@internationalized/date'
import { useStore } from './store'
import { START_OF_WEEK_LOCALE } from '../constants'

const IS_FIRST_RESPONDER: Record<string, boolean> = {
  yes: true,
  no: false,
}

const CalendarFilterCard = () => {
  const [isPartialFilterView, setIsPartialFilterView] = useState<boolean>(true)
  const fetchAppointments = useBookedAppointmentsStore(
    (state) => state.fetchData,
  )
  const setStartDate = useStore(state => state.setStartDate)
  const form = useForm<CalenderViewSchemaType>({
    resolver: zodResolver(calenderViewSchema),
    criteriaMode: 'all',
    defaultValues: {
      startingDate: undefined,
      endingDate: undefined,
      stateId: '',
      locationId: '',
      serviceIds: [],
      providerIds: '',
      visitMedium: '',
      providerType: '',
      gender: '',
      providerLanguage: '',
      isFirstResponder: '',
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
      isFirstResponder: data.isFirstResponder
        ? IS_FIRST_RESPONDER[data.isFirstResponder]
        : undefined,
    }
    if (data.startingDate) {
      const weekStartDate = startOfWeek(data.startingDate, START_OF_WEEK_LOCALE)
      setStartDate(weekStartDate)
    }
    const sanitizedData = sanitizeFormData(transformedData)
    fetchAppointments({ params: sanitizedData, view: View.Calendar })
  }

  const resetFilters = () => {
    if (!isDirty(dirtyFields)) return
    form.reset()
    fetchAppointments({ view: View.Calendar })
  }

  const FilterButton = isPartialFilterView
    ? ShowFiltersButton
    : HideFiltersButton
  return (
    <Flex className="bg-white z-10 rounded-[4px] px-1.5 shadow-3" mx="5" mt="1">
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex
          className="sticky top-0"
          wrap="wrap"
          gap="2"
          align="center"
          py="1"
        >
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
          <Flex width="full" gap="2" py="1" align="center">
            <ProviderTypeDropdown />
            <GenderSelect />
            <LanguageSelect />
            <FirstResponderSelect />
            <FilterButton
              onClick={() => setIsPartialFilterView(!isPartialFilterView)}
            />
            <ClearFilterButton onClick={resetFilters} />
            <SearchButton />
          </Flex>
        )}
      </FormContainer>
    </Flex>
  )
}

export { CalendarFilterCard }
