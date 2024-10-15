import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { startOfWeek } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { getDateString, isDirty } from '../utils'
import { ClearFilterButton } from './clear-filter-button'
import {
  EndDateInput,
  FirstResponderSelect,
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

const IS_FIRST_RESPONDER: Record<string, boolean> = {
  yes: true,
  no: false,
}

const dateValidation = z.custom<DateValue>()

const schema = z.object({
  startingDate: dateValidation.optional(),
  endingDate: dateValidation.optional(),
  stateId: z.string().optional(),
  locationIds: z.string().optional(),
  serviceIds: z
    .array(z.string())
    .refine((value) => value.every((item) => typeof item === 'string'), {
      message: 'Array must be empty or contain only strings',
    }),
  staffIds: z.string().optional(),
  specialistTypeCode: z.string().optional(),
  gender: z.string().optional(),
  language: z.string().optional(),
  isFirstResponder: z.string().optional(),
  slotType: z.string().optional(),
})

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
      isFirstResponder: '',
      slotType: '',
    },
  })

  const { dirtyFields } = form.formState

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    if (!isDirty(dirtyFields)) return
    const transformedData = {
      ...data,
      startingDate: getDateString(data.startingDate),
      endingDate: getDateString(data.endingDate),
      locationIds: data.locationIds ? [data.locationIds] : [],
      staffIds: data.staffIds ? [data.staffIds] : [],
      isFirstResponder: data.isFirstResponder
        ? IS_FIRST_RESPONDER[data.isFirstResponder]
        : undefined,
    }
    if (data.startingDate) {
      const weekStartDateValue = startOfWeek(data.startingDate, 'en-US').add({
        days: 1,
      })
      setDates(new Date(weekStartDateValue.toString()))
    }
    const sanitizedData = sanitizeFormData(transformedData)
    fetchData(sanitizedData)
  }

  const resetFilters = () => {
    if (!isDirty(dirtyFields)) return
    form.reset()

    fetchData()
  }

  return (
    <Flex
      className="rounded-[4px] px-1.5 shadow-3"
      direction="column"
      mx="5"
      mt="1"
    >
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex
          direction="column"
          gap="1"
          py="1"
          className="bg-white sticky top-0"
        >
          {showFollowUpFilter ? (
            <Flex gap="2" align="center">
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
            <Flex gap="2">
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
            <Flex gap="2" align="center">
              <VisitMediumSelect />
              <ProviderTypeDropdown />
              <GenderSelect />
              <LanguageSelect />
              <FirstResponderSelect />
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
