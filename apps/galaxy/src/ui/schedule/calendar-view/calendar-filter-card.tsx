import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { CALENDAR_VIEW_FILTERS } from '../constants'
import { FiltersContext } from '../context'
import { useProviderId } from '../hooks'
import { AddFiltersPopover, FacilityFields } from '../shared'
import { useStore as useRootStore } from '../store'
import { CalenderViewSchemaType } from '../types'
import { calenderViewSchema } from './calender-view-schema'
import { ClearFilterButton } from './clear-filter-button'
import { getDefaultValues } from './default-values'
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
import { SaveSettingsButton } from './save-settings-button'
import { SearchButton } from './search-button'
import { ShowFiltersButton } from './show-filters-button'
import { useStore } from './store'
import {
  transformFilterValues,
  transformParamsToFilterValues,
  transformSettingToFilterValues,
} from './transform'
import { VisitTypeSelect } from '../list-view/filter-fields'

const CalendarFilterCard = () => {
  const [filters, setFilters] = useState<string[]>(CALENDAR_VIEW_FILTERS)
  const [isPartialFilterView, setIsPartialFilterView] = useState<boolean>(false)
  const {
    fetchData,
    fetchUserSetting,
    fetchDataWithSettings,
    updateUserFilterSettings,
    loading,
    persistedFormData,
    setPersistedFormData,
    isSettingsSaving,
  } = useStore()
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)
  const { cachedFilters, saveFilters } = useRootStore((state) => ({
    cachedFilters: state.cachedFiltersList,
    saveFilters: state.saveListFilters,
  }))
  const providerId = useProviderId()
  const defaultValues = getDefaultValues(providerId)
  const ctxValue = useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters],
  )
  const form = useForm<CalenderViewSchemaType>({
    resolver: zodResolver(calenderViewSchema),
    criteriaMode: 'all',
    defaultValues: defaultValues,
    disabled: loading || isSettingsSaving,
  })

  useEffect(() => {
    useStore.persist.rehydrate()
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    const fetchCalendarViewData = async () => {
      const map = await fetchUserSetting()
      if (persistedFormData) {
        const filterValues = transformParamsToFilterValues(persistedFormData)
        form.reset({ ...defaultValues, ...filterValues })
        applyFilters(filterValues)
      } else if (map && map.size > 0) {
        const filterValues = transformSettingToFilterValues(map)
        form.reset({ ...defaultValues, ...filterValues })
        fetchDataWithSettings(map)
      } else if (providerId) {
        fetchData({ providerIds: [Number(providerId)] })
      }
    }
     if (cachedFilters.length > 0) {
      setFilters(cachedFilters)
    }
    fetchCalendarViewData()
  }, [hasHydrated])

  const applyFilters = (data: CalenderViewSchemaType, persist?: boolean) => {
    const transformedData = transformFilterValues(data)
    const sanitizedData = sanitizeFormData(transformedData)
    if (persist) {
      setPersistedFormData(sanitizedData)
    }
    fetchData(sanitizedData)
  }

  const onSubmit: SubmitHandler<CalenderViewSchemaType> = async (data) => {
    applyFilters(data, true)
  }

  const resetFilters = () => {
    form.reset(defaultValues)
    const providerDefaults = { providerIds: [Number(providerId)] }
    setPersistedFormData(providerDefaults)
    if (providerId) {
      fetchData(providerDefaults)
    }
  }

  const saveSettings = () => {
    const values = form.getValues()
    const transformedValues = transformFilterValues(values)
    updateUserFilterSettings(transformedValues)
  }

  const FilterButton = isPartialFilterView
    ? ShowFiltersButton
    : HideFiltersButton

  return (
    <Flex className="bg-white z-10 rounded-[4px] px-2.5 shadow-3">
    <FiltersContext.Provider value={ctxValue}>
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex wrap="wrap" gap="2" align="start" py="1">
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
              <SaveSettingsButton onClick={saveSettings} />
              <SearchButton />
            </Flex>
          )}
        </Flex>
        {!isPartialFilterView && (
          <Flex width="full" gap="2" py="1" align="start">
            <FacilityFields/>
            <VisitTypeSelect/>
            <ProviderTypeDropdown />
            <GenderSelect />
            <LanguageSelect />
            <AddFiltersPopover
                view="Calendar View"
                onSave={saveFilters}
                viewFilters={CALENDAR_VIEW_FILTERS}
              />
            <Flex className="flex-1" justify="end" gap="2" align="center" wrap={"wrap"}>
              <FilterButton
                onClick={() => setIsPartialFilterView(!isPartialFilterView)}
              />
              <ClearFilterButton onClick={resetFilters} />
              <SaveSettingsButton onClick={saveSettings} />
              <SearchButton />
            </Flex>
          </Flex>
        )}
      </FormContainer>
    </FiltersContext.Provider>
     </Flex>
  )
}

export { CalendarFilterCard }
