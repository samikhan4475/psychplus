import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { StateCodeSet } from '@/ui/visit/add-visit/types'
import { getAppointments } from '../actions'
import {
  AppointmentEventData,
  AvailableSlotsEvent,
  CalenderViewSchemaType,
} from '../types/calender'
import { calenderViewSchema } from './calender-view-schema'
import { ClearFilterButton } from './clear-filter-button'
import { FirstResponderSelect } from './first-responder-select'
import { GenderSelect } from './gender-select'
import { HideFiltersButton } from './hide-filters-button'
import { LanguageSelect } from './language-select'
import { LocationDropdown } from './location-dropdown'
import { ProviderDropdown } from './provider-dropdown'
import { ProviderTypeDropdown } from './provider-type-dropdown'
import { SearchButton } from './search-button'
import { ServiceDropdown } from './service-dropdown'
import { ShowFiltersButton } from './show-filters-button'
import { StartDateInput } from './start-date-input'
import { StateSelect } from './state-select'
import { VisitMediumDropdown } from './visit-medium-dropdown'

interface CalendarFilterCardProps {
  setSlots: (slots: AvailableSlotsEvent<AppointmentEventData>[]) => void
  states: StateCodeSet[]
}

const CalendarFilterCard = ({ setSlots, states }: CalendarFilterCardProps) => {
  const [isPartialFilterView, setIsPartialFilterView] = useState<boolean>(true)
  const form = useForm<CalenderViewSchemaType>({
    resolver: zodResolver(calenderViewSchema),
    criteriaMode: 'all',
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      stateId: '',
    },
  })

  const onSubmit: SubmitHandler<CalenderViewSchemaType> = async (values) => {
    const result = await getAppointments(values)
    if (result.state === 'error') {
      toast.error(result.error)
      return
    }
    setSlots(result.data)
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
          <StateSelect states={states} />
          <LocationDropdown />
          <ServiceDropdown />
          <ProviderDropdown />
          <VisitMediumDropdown />
          {isPartialFilterView && (
            <Flex gap="2">
              <FilterButton
                onClick={() => setIsPartialFilterView(!isPartialFilterView)}
              />
              <ClearFilterButton />
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
            <ClearFilterButton />
            <SearchButton />
          </Flex>
        )}
      </FormContainer>
    </Flex>
  )
}

export { CalendarFilterCard }
