import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { startOfWeek } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { START_OF_WEEK_LOCALE } from '../constants'
import { useProviderId } from '../hooks'
import { ClearFilterButton } from './clear-filter-button'
import { getDefaultValues } from './default-value'
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
import { SaveSettingsButton } from './save-settings-button'
import { schema, SchemaType } from './schema'
import { SearchButton } from './search-button'
import { ShowFiltersButton } from './show-filters-button'
import { useStore } from './store'
import {
  transformFilterValues,
  transformParamsToFilterValues,
  transformSettingToFilterValues,
} from './transform'
import { getCurrentWeekStart } from './utils'

const SchedulerFilterGroup = ({
  showFollowUpFilter = false,
}: {
  showFollowUpFilter: boolean
}) => {
  const [isPartialFilterView, setIsPartialFilterView] =
    useState<boolean>(showFollowUpFilter)
  const {
    setDates,
    fetchAppointments,
    fetchUserSettings,
    fetchDataWithSettings,
    updateUserFilterSettings,
    loading,
    persistedFormData,
    setPersistedFormData,
    isSettingsSaving,
  } = useStore()
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)
  const providerId = useProviderId()
  const defaultValues = getDefaultValues(providerId)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues,
    disabled: loading || isSettingsSaving,
  })

  useEffect(() => {
    useStore.persist.rehydrate()
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    const fetchSlots = async () => {
      const map = await fetchUserSettings()
      if (persistedFormData && !showFollowUpFilter) {
        const filterValues = transformParamsToFilterValues(persistedFormData)
        form.reset(filterValues)
        applyFilters(filterValues)
      } else if (map && map.size > 0 && !showFollowUpFilter) {
        const filterValues = transformSettingToFilterValues(map)
        form.reset({ ...defaultValues, ...filterValues })
        fetchDataWithSettings(map)
      } else if (providerId) {
        fetchAppointments({ staffIds: [Number(providerId)] })
      }
    }
    fetchSlots()
  }, [hasHydrated])

  const applyFilters = (data: SchemaType, persist?: boolean) => {
    const transformedData = transformFilterValues(data)
    if (data.startingDate) {
      const weekStartDateValue = startOfWeek(
        data.startingDate,
        START_OF_WEEK_LOCALE,
      )
      setDates(new Date(weekStartDateValue.toString()))
    }
    const sanitizedData = sanitizeFormData(transformedData)
    delete sanitizedData.endingDate
    if (persist) {
      setPersistedFormData(sanitizedData)
    }
    fetchAppointments(sanitizedData)
  }

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    applyFilters(data, true)
  }

  const resetFilters = () => {
    form.reset(defaultValues)
    const currentDate = getCurrentWeekStart()
    setDates(currentDate, 13)
    const providerDefaults = { staffIds: [Number(providerId)] }
    setPersistedFormData(providerDefaults)
    if (providerId) {
      fetchAppointments(providerDefaults)
    }
  }

  const saveSettings = () => {
    const values = form.getValues()
    const transformedValues = transformFilterValues(values)
    updateUserFilterSettings(transformedValues)
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
                  <SaveSettingsButton onClick={saveSettings} />
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
                <SaveSettingsButton onClick={saveSettings} />
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
