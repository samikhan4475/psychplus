import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { getLocalTimeZone, startOfWeek, today } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { START_OF_WEEK_LOCALE } from '../constants'
import { getDateString, isDirty } from '../utils'
import { ClearFilterButton } from './clear-filter-button'
import {
  EndDateInput,
  GenderSelect,
  LanguageSelect,
  LocationDropdown,
  ProviderDropdown,
  ProviderTypeDropdown,
  ServiceMultiSelect,
  StartDateInput,
  StateSelect,
  VisitMediumSelect,
} from './filter-fields'
import { HideFiltersButton } from './hide-filters-button'
import { SearchButton } from './search-button'
import { ShowFiltersButton } from './show-filters-button'
import { useStore } from './store'
import { schema } from './schema'

type SchemaType = z.infer<typeof schema>

const SchedulerFilterGroup = ({
  showFollowUpFilter = false,
}: {
  showFollowUpFilter: boolean
}) => {
  const [isPartialFilterView, setIsPartialFilterView] =
    useState<boolean>(showFollowUpFilter)
  const { fetchData, setDates } = useStore((state) => ({
    setDates: state.setDates,
    fetchData: state.fetchAppointments,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      startingDate: undefined,
      endingDate: undefined,
      stateId: '',
      locationIds: '',
      serviceIds: [],
      staffIds: '',
      specialistTypeCode: '',
      gender: '',
      language: '',
      type: '',
    },
  })

  const getMaxDaysOutToLookFor = (start?: DateValue, end?: DateValue) => {
    if (!end) return
    const startingDate = start ? start : today(getLocalTimeZone())
    return Math.abs(end.compare(startingDate)) + 1
  }

  const { dirtyFields } = form.formState

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    if (!isDirty(dirtyFields)) return
    const transformedData = {
      ...data,
      startingDate: getDateString(data.startingDate),
      locationIds: data.locationIds ? [data.locationIds] : [],
      staffIds: data.staffIds ? [Number(data.staffIds)] : [],
      maxDaysOutToLook: getMaxDaysOutToLookFor(
        data.startingDate,
        data.endingDate,
      ),
    }

    if (data.startingDate) {
      const weekStartDateValue = startOfWeek(
        data.startingDate,
        START_OF_WEEK_LOCALE,
      )
      setDates(new Date(weekStartDateValue.toString()))
    }
    const sanitizedData = sanitizeFormData(transformedData)
    delete sanitizedData.endingDate
    fetchData(sanitizedData)
  }

  const resetFilters = () => {
    if (!isDirty(dirtyFields)) return
    form.reset()

    fetchData()
  }

  return (
    <Flex className="rounded-[4px] px-2.5 shadow-3" direction="column">
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex
          direction="column"
          gap="1"
          py="1"
          className="bg-white sticky top-0"
        >
          {showFollowUpFilter ? (
            <Flex gap="2" align="start">
              <StateSelect />
              <LocationDropdown />
              <ServiceMultiSelect />
              <ProviderTypeDropdown />
              <ProviderDropdown />
              <VisitMediumSelect />
              <Flex className="flex-1" justify="end" gap="2" align="center">
                <ClearFilterButton onClick={resetFilters} />
                <SearchButton />
              </Flex>
            </Flex>
          ) : (
            <Flex gap="2" align="start">
              <StartDateInput />
              <EndDateInput />
              <StateSelect />
              <LocationDropdown />
              <ServiceMultiSelect />
              <ProviderDropdown />
              {isPartialFilterView && (
                <>
                  <ClearFilterButton onClick={resetFilters} />
                  <SearchButton />
                  <ShowFiltersButton
                    onClick={() => setIsPartialFilterView(false)}
                  />
                </>
              )}
            </Flex>
          )}
          {!isPartialFilterView && (
            <Flex gap="2" align="start">
              <ProviderTypeDropdown />
              <GenderSelect />
              <VisitMediumSelect />
              <LanguageSelect />
              <Flex className="flex-1" justify="end" gap="2" align="center">
                <HideFiltersButton
                  onClick={() => setIsPartialFilterView(true)}
                />
                <ClearFilterButton onClick={resetFilters} />
                <SearchButton />
              </Flex>
            </Flex>
          )}
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export { SchedulerFilterGroup, type SchemaType }
