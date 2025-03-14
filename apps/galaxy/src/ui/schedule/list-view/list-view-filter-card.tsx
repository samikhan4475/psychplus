'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { LIST_VIEW_FILTERS } from '../constants'
import { FiltersContext } from '../context'
import { useProviderId } from '../hooks'
import {
  bookedAppointmentsSchema,
  BookedAppointmentsSchemaType,
} from '../schema'
import {
  AddFiltersPopover,
  FacilityFields,
  FiltersButtonsGroup,
} from '../shared'
import { useStore as useRootStore } from '../store'
import { getDateString, getLocalTime } from '../utils'
import { getDefaultValues } from './default-values'
import {
  AgeInput,
  AuthorizationNumberInput,
  BalanceInputRange,
  CoInsuranceInputRange,
  CoPayInputRange,
  DateOfAdmissionRange,
  DateOfBirthInput,
  EndDateInput,
  GenderSelect,
  InsuranceFilters,
  InsuranceVerificationSelect,
  LastCoverageDateRange,
  LegalStatusSelect,
  LengthOfStayRange,
  LocationDropdown,
  NameInput,
  NoteSignedSelect,
  PatientStatusSelect,
  ProviderDropdown,
  ProviderTypeDropdown,
  ServiceMultiSelect,
  StartDateInput,
  StateSelect,
  TimeInputField,
  VisitMediumSelect,
  VisitSequenceSelect,
  VisitStatusSelect,
  VisitTypeSelect,
} from './filter-fields'
import { useStore } from './store'
import {
  transformFilterValues,
  transformParamsToFilterValues,
  transformSettingToFilterValues,
} from './transform'

const ListViewFilterCard = () => {
  const [filters, setFilters] = useState<string[]>(LIST_VIEW_FILTERS)
  const {
    fetchAppointments,
    fetchAppointmentsWithSettings,
    fetchUserSetting,
    updateUserFilterSettings,
    persistedFormData,
    setPersistedFormData,
    loading,
    isSettingsSaving,
  } = useStore((state) => ({
    fetchAppointments: state.fetchAppointments,
    fetchAppointmentsWithSettings: state.fetchAppointmentsWithSettings,
    fetchUserSetting: state.fetchUserSetting,
    updateUserFilterSettings: state.updateUserFilterSettings,
    persistedFormData: state.persistedFormData,
    setPersistedFormData: state.setPersistedFormData,
    loading: state.loading,
    isSettingsSaving: state.isSettingsSaving,
  }))
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

  const form = useForm<BookedAppointmentsSchemaType>({
    resolver: zodResolver(bookedAppointmentsSchema),
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
      } else if (providerId) {
        fetchAppointments({ providerIds: [Number(providerId)] })
      }
    }
    if (cachedFilters.length > 0) {
      setFilters(cachedFilters)
    }
    fetchData()
  }, [hasHydrated])

  const applyFilters = (
    data: BookedAppointmentsSchemaType,
    persist?: boolean,
  ) => {
    const transformedData = transformFilterValues(data)
    if (persist) {
      setPersistedFormData(transformedData)
    }
    fetchAppointments(transformedData, 1)
  }

  const onSubmit: SubmitHandler<BookedAppointmentsSchemaType> = (data) => {
    applyFilters(data, true)
  }

  const resetFilters = () => {
    form.reset(defaultValues)
    const providerDefaults = { providerIds: [Number(providerId)] }
    setPersistedFormData(providerDefaults)
    if (providerId) {
      fetchAppointments(providerDefaults)
    }
  }

  const saveSettings = () => {
    const values = form.getValues()
    const transformedValues = transformFilterValues(values)
    updateUserFilterSettings({
      ...transformedValues,
      lastCoverageDateStart: getDateString(values.lastCoverageDateStart),
      lastCoverageDateEnd: getDateString(values.lastCoverageDateEnd),
      bookedAppointmentTime: getLocalTime(values.bookedAppointmentTime),
    })
  }

  return (
    <Flex
      direction="column"
      className="bg-white z-10 px-2.5 py-2 shadow-3"
      position="sticky"
      top="0"
    >
      <FiltersContext.Provider value={ctxValue}>
        <FormContainer form={form} onSubmit={onSubmit}>
          <Flex align="start" direction="column" wrap="wrap" gap="2">
            <Flex align="start" width="100%" gap="2">
              <StartDateInput />
              <EndDateInput />
              <TimeInputField />
              <NameInput />
              <AgeInput />
              <GenderSelect />
              <DateOfBirthInput />
              <PatientStatusSelect />
              <StateSelect />
            </Flex>
            <Grid
              className="grid w-full grid-cols-[repeat(auto-fit,minmax(235px,1fr))]"
              gap="2"
            >
              <LocationDropdown />
              <ServiceMultiSelect />
              <FacilityFields />
              <ProviderTypeDropdown />
              <ProviderDropdown />
              <VisitTypeSelect />
              <VisitSequenceSelect />
              <VisitMediumSelect />
              <VisitStatusSelect />
              <InsuranceVerificationSelect />
              <InsuranceFilters />
              <CoPayInputRange />
              <CoInsuranceInputRange />
              <BalanceInputRange />
              <DateOfAdmissionRange />
              <LengthOfStayRange />
              <LastCoverageDateRange />
              <AuthorizationNumberInput />
              <LegalStatusSelect />
              <NoteSignedSelect />
              <FiltersButtonsGroup
                resetFilters={resetFilters}
                saveSettings={saveSettings}
              >
                <AddFiltersPopover
                  view="List View"
                  onSave={saveFilters}
                  viewFilters={LIST_VIEW_FILTERS}
                />
              </FiltersButtonsGroup>
            </Grid>
          </Flex>
        </FormContainer>
      </FiltersContext.Provider>
    </Flex>
  )
}

export { ListViewFilterCard }
