'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
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
import {
  getCalendarDateLabel,
  getDateString,
  getUtcDateWithoutTime,
  getUtcTime,
  isDirty,
} from '../utils'
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
  InsuranceVerificationSelect,
  LastCoverageDateRange,
  LegalStatusSelect,
  LengthOfStayRange,
  LocationDropdown,
  NameInput,
  NoteSignedSelect,
  PatientStatusSelect,
  PrimaryInsuranceDropdown,
  ProviderDropdown,
  ProviderTypeDropdown,
  SecondaryInsuranceDropdown,
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

const ListViewFilterCard = () => {
  const [filters, setFilters] = useState<string[]>(LIST_VIEW_FILTERS)
  const { fetchData } = useStore((state) => ({
    fetchData: state.fetchAppointments,
  }))
  const { cachedFilters, saveFilters } = useRootStore((state) => ({
    cachedFilters: state.cachedFiltersList,
    saveFilters: state.saveListFilters,
  }))
  const providerId = useProviderId()
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
    defaultValues: {
      startingDate: undefined,
      endingDate: undefined,
      bookedAppointmentTime: undefined,
      name: '',
      age: undefined,
      gender: '',
      dateOfBirth: undefined,
      patientStatuses: '',
      stateIds: [],
      locationId: '',
      serviceIds: [],
      providerType: '',
      providerIds: providerId ?? '',
      unitId: '',
      roomId: '',
      groupId: '',
      primaryInsuranceName: '',
      secondaryInsuranceName: '',
      visitType: '',
      visitSequence: '',
      visitMedium: '',
      appointmentStatus: '',
      patientInsuranceVerificationStatus: '',
      diagnosisCode: '',
      insuranceAuthorizationNumber: '',
      cptCode: '',
      dateOfAdmissionStart: undefined,
      dateOfAdmissionEnd: undefined,
      lengthOfStayMin: undefined,
      lengthOfStayMax: undefined,
      lastCoverageDateStart: undefined,
      lastCoverageDateEnd: undefined,
      legalStatus: '',
      copayDueMin: undefined,
      copayDueMax: undefined,
      coInsuranceDueMin: undefined,
      coInsuranceDueMax: undefined,
      balanceDueMin: undefined,
      balanceDueMax: undefined,
      noteSignedStatus: '',
    },
  })

  const { dirtyFields } = form.formState

  useEffect(() => {
    if (cachedFilters.length > 0) {
      setFilters(cachedFilters)
    }
  }, [])

  const onSubmit: SubmitHandler<BookedAppointmentsSchemaType> = (data) => {
    if (!isDirty(dirtyFields)) return
    const transformedData = {
      ...data,
      startingDate: getUtcDateWithoutTime(data.startingDate),
      endingDate: getUtcDateWithoutTime(data.endingDate),
      dateOfBirth: getCalendarDateLabel(data.dateOfBirth),
      dateOfAdmissionStart: getDateString(data.dateOfAdmissionStart),
      dateOfAdmissionEnd: getDateString(data.dateOfAdmissionEnd),
      lastCoverageDateStart: getDateString(data.lastCoverageDateStart),
      lastCoverageDateEnd: getDateString(data.lastCoverageDateEnd),
      patientStatuses: data.patientStatuses ? [data.patientStatuses] : [],
      bookedAppointmentTime: getUtcTime(data.bookedAppointmentTime),
      providerIds: data.providerIds ? [Number(data.providerIds)] : [],
    }
    const sanitizedData = sanitizeFormData(transformedData)
    fetchData(sanitizedData, 1)
  }

  const resetFilters = () => {
    if (!isDirty(dirtyFields)) return
    form.reset()
    if (providerId) {
      fetchData({ providerIds: [Number(providerId)] })
    }
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
              className="grid w-full grid-cols-[repeat(auto-fill,minmax(235px,1fr))]"
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
              <PrimaryInsuranceDropdown />
              <SecondaryInsuranceDropdown />
              <CoPayInputRange />
              <CoInsuranceInputRange />
              <BalanceInputRange />
              <DateOfAdmissionRange />
              <LengthOfStayRange />
              <LastCoverageDateRange />
              <AuthorizationNumberInput />
              <LegalStatusSelect />
              <NoteSignedSelect />
              <FiltersButtonsGroup resetFilters={resetFilters}>
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
