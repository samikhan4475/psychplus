'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { ROUNDING_FILTERS } from '../constants'
import { FiltersContext } from '../context'
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
import { defaultValues } from './default-values'
import {
  AgeInput,
  BalanceRange,
  CoInsuranceRange,
  CoPayRange,
  CptCodeInput,
  DateOfAdmissionRange,
  DateOfBirthInput,
  DiagnosisInput,
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
  ProviderTypeDropdown,
  ServiceDropdown,
  StartDateInput,
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

const RoundingViewFilterCard = () => {
  const [filters, setFilters] = useState<string[]>(ROUNDING_FILTERS)
  const [hasHydrated, setHasHydrated] = useState<boolean>(false)
  const { cachedFilters, saveFilters } = useRootStore((state) => ({
    cachedFilters: state.cachedFiltersRounding,
    saveFilters: state.saveRoundingFilters,
  }))
  const {
    fetchData,
    loading,
    isSettingsSaving,
    fetchUserSetting,
    persistedFormData,
    setPersistedFormData,
    fetchAppointmentsWithSettings,
    updateUserFilterSettings,
  } = useStore((state) => ({
    fetchData: state.fetchAppointments,
    loading: state.loading,
    isSettingsSaving: state.isSettingsSaving,
    fetchUserSetting: state.fetchUserSetting,
    persistedFormData: state.persistedFormData,
    setPersistedFormData: state.setPersistedFormData,
    fetchAppointmentsWithSettings: state.fetchAppointmentsWithSettings,
    updateUserFilterSettings: state.updateUserFilterSettings,
  }))

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
    fetchData(transformedData, 1)
  }

  const onSubmit: SubmitHandler<BookedAppointmentsSchemaType> = (data) => {
    applyFilters(data, true)
  }

  const resetFilters = () => {
    form.reset(defaultValues)
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
            <Flex align="start" width="100%" gap="2">
              <StartDateInput />
              <EndDateInput />
              <NameInput />
              <AgeInput />
              <GenderSelect />
              <DateOfBirthInput />
              <PatientStatusSelect />
              <LocationDropdown />
              <ServiceDropdown />
            </Flex>
            <Grid
              className="grid w-full grid-cols-[repeat(auto-fit,minmax(235px,1fr))]"
              gap="2"
            >
              <ProviderTypeDropdown />
              <FacilityFields />
              <InsuranceFilters />
              <VisitTypeSelect />
              <VisitSequenceSelect />
              <VisitMediumSelect />
              <VisitStatusSelect />
              <InsuranceVerificationSelect />
              <DiagnosisInput />
              <CptCodeInput />
              <DateOfAdmissionRange />
              <LengthOfStayRange />
              <LastCoverageDateRange />
              <LegalStatusSelect />
              <CoPayRange />
              <CoInsuranceRange />
              <BalanceRange />
              <NoteSignedSelect />
              <FiltersButtonsGroup
                resetFilters={resetFilters}
                saveSettings={saveSettings}
              >
                <AddFiltersPopover
                  view="Rounding View"
                  onSave={saveFilters}
                  viewFilters={ROUNDING_FILTERS}
                />
              </FiltersButtonsGroup>
            </Grid>
          </Flex>
        </FormContainer>
      </FiltersContext.Provider>
    </Flex>
  )
}

export { RoundingViewFilterCard }
