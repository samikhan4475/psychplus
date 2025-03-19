'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { PROVIDER_CODING_FILTERS } from '../constants'
import { FiltersContext } from '../context'
import { AddFiltersPopover, FiltersButtonsGroup } from '../shared'
import { useStore as useRootStore } from '../store'
import { defaultValues } from './default-values'
import { Age } from './filter-fields/age'
import { BalanceRange } from './filter-fields/bal-range'
import { CoInsuranceRange } from './filter-fields/co-ins-range'
import { CoPayRange } from './filter-fields/copay-range'
import { CPTCode } from './filter-fields/cpt-code'
import { DateOfAdmissionRange } from './filter-fields/date-of-admission-range'
import { Diagnosis } from './filter-fields/diagnosis'
import { DateOfBirthInput } from './filter-fields/dob-input'
import { EndDate } from './filter-fields/end-date'
import { FacilityAdmissionIdSelect } from './filter-fields/facility-admission-id-select'
import { FacilityFilters } from './filter-fields/facility-filters'
import { GenderSelect } from './filter-fields/gender-select'
import { InsuranceVerificationDropdown } from './filter-fields/ins-verification-dropdown'
import { InsuranceFilters } from './filter-fields/insurance-filters'
import { LastCoverageDateRange } from './filter-fields/last-coverage-date-range'
import { LegalStatusDropdown } from './filter-fields/legal-status-dropdown'
import { LengthOfStayRange } from './filter-fields/length-of-stay-range'
import { LocationDropdown } from './filter-fields/location-dropdown'
import { MediumDropdown } from './filter-fields/medium-dropdown'
import { Name } from './filter-fields/name'
import { NoteSignedDropdown } from './filter-fields/note-signed-dropdown'
import { ProviderDropdown } from './filter-fields/provider-dropdown'
import { SequenceDropdown } from './filter-fields/sequence-dropdown'
import { ServiceMultiSelect } from './filter-fields/service-multiselect'
import { StartDate } from './filter-fields/start-date'
import { StatusDropdown } from './filter-fields/status-dropdown'
import { VisitTypeDropdown } from './filter-fields/visit-type-dropdown'
import {
  ProviderCodingSchema,
  providerCodingViewSchema,
} from './provider-coding-view-schema'
import { useStore } from './store'
import {
  transformFilterValues,
  transformParamsToFilterValues,
  transformSettingToFilterValues,
} from './transform'

const ProviderCodingFilters = () => {
  const [filters, setFilters] = useState<string[]>(PROVIDER_CODING_FILTERS)
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)
  const { cachedFilters, saveFilters } = useRootStore((state) => ({
    cachedFilters: state.providerCodingFilters,
    saveFilters: state.saveProviderCodingFilters,
  }))
  const {
    fetchProviderCodingView,
    updateUserFilterSettings,
    fetchUserSetting,
    persistedFormData,
    setPersistedFormData,
    fetchAppointmentsWithSettings,
    loading,
    isSettingsSaving,
  } = useStore((state) => ({
    fetchProviderCodingView: state.fetchProviderCodingView,
    updateUserFilterSettings: state.updateUserFilterSettings,
    fetchUserSetting: state.fetchUserSetting,
    persistedFormData: state.persistedFormData,
    setPersistedFormData: state.setPersistedFormData,
    fetchAppointmentsWithSettings: state.fetchAppointmentsWithSettings,
    loading: state.loading,
    isSettingsSaving: state.isSettingsSaving,
  }))

  const ctxValue = useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters],
  )

  useEffect(() => {
    useStore.persist.rehydrate()
    setHasHydrated(true)
  }, [])

  useEffect(() => {
    if (!hasHydrated) return

    const fetchData = async () => {
      const map = await fetchUserSetting()
      if (persistedFormData) {
        const filterValues = transformParamsToFilterValues(persistedFormData)
        form.reset({ ...defaultValues, ...filterValues })
        applyFilters(filterValues)
      } else if (map && map.size > 0) {
        const filterValues = transformSettingToFilterValues(map)
        form.reset({ ...defaultValues, ...filterValues })
        fetchAppointmentsWithSettings(map)
      }
    }

    if (cachedFilters.length > 0) {
      setFilters(cachedFilters)
    }

    fetchData()
  }, [hasHydrated])

  const form = useForm<ProviderCodingSchema>({
    resolver: zodResolver(providerCodingViewSchema),
    criteriaMode: 'all',
    defaultValues,
    disabled: loading || isSettingsSaving,
  })

  const applyFilters = (data: ProviderCodingSchema, persist?: boolean) => {
    const transformedData = transformFilterValues(data)

    if (persist) {
      setPersistedFormData(transformedData)
    }

    fetchProviderCodingView(transformedData)
  }

  const onSubmit: SubmitHandler<ProviderCodingSchema> = (data) => {
    applyFilters(data, true)
  }

  const saveSettings = () => {
    const values = form.getValues()
    const transformedValues = transformFilterValues(values)
    updateUserFilterSettings(transformedValues)
  }

  return (
    <Flex
      direction="column"
      className="bg-white z-10 p-2 px-2.5 shadow-3"
      position="sticky"
      top="0"
    >
      <FiltersContext.Provider value={ctxValue}>
        <FormContainer form={form} onSubmit={onSubmit}>
          <Flex align="start" direction="column" wrap="wrap" gap="2">
            <Grid
              className="grid w-full grid-cols-[repeat(auto-fit,minmax(235px,1fr))]"
              gap="2"
            >
              <StartDate />
              <EndDate />
              <Name />
              <Age />
              <GenderSelect />
              <DateOfBirthInput />
              <LocationDropdown />
              <ServiceMultiSelect />
              <ProviderDropdown />
              <FacilityFilters />
              <InsuranceFilters />
              <VisitTypeDropdown />
              <SequenceDropdown />
              <MediumDropdown />
              <StatusDropdown />
              <InsuranceVerificationDropdown />
              <Diagnosis />
              <CPTCode />
              <DateOfAdmissionRange />
              <LengthOfStayRange />
              <LastCoverageDateRange />
              <LegalStatusDropdown />
              <CoPayRange />
              <CoInsuranceRange />
              <BalanceRange />
              <NoteSignedDropdown />
              <FacilityAdmissionIdSelect />
              <FiltersButtonsGroup
                resetFilters={() => form.reset(defaultValues)}
                saveSettings={saveSettings}
              >
                <AddFiltersPopover
                  view="Provider Coding"
                  onSave={saveFilters}
                  viewFilters={PROVIDER_CODING_FILTERS}
                />
              </FiltersButtonsGroup>
            </Grid>
          </Flex>
        </FormContainer>
      </FiltersContext.Provider>
    </Flex>
  )
}

export { ProviderCodingFilters }
