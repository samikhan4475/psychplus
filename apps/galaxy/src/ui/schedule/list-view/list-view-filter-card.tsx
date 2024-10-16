'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { LIST_VIEW_FILTERS, NOTE_SIGNED } from '../constants'
import { FiltersContext } from '../context'
import {
  bookedAppointmentsSchema,
  BookedAppointmentsSchemaType,
} from '../schema'
import { AddFiltersPopover, FacilityFields, FiltersButtonsGroup } from '../shared'
import { useBookedAppointmentsStore, useStore } from '../store'
import { View } from '../types'
import { getDateString, isDirty } from '../utils'
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

const ListViewFilterCard = () => {
  const [filters, setFilters] = useState<string[]>(LIST_VIEW_FILTERS)
  const fetchData = useBookedAppointmentsStore((state) => state.fetchData)
  const { cachedFilters, saveFilters } = useStore((state) => ({
    cachedFilters: state.cachedFiltersList,
    saveFilters: state.saveListFilters,
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
    defaultValues: {
      startingDate: undefined,
      endingDate: undefined,
      time: undefined,
      name: '',
      age: undefined,
      gender: '',
      dateOfBirth: undefined,
      patientStatuses: '',
      stateId: '',
      locationId: '',
      serviceIds: [],
      providerType: '',
      providerIds: '',
      unitId: '',
      room: '',
      groupId: '',
      primaryInsuranceName: '',
      secondaryInsuranceName: '',
      visitType: '',
      visitSequence: '',
      visitMedium: '',
      visitStatus: '',
      patientInsuranceVerificationStatus: '',
      diagnosisCode: '',
      authorizationNumber: '',
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
      isNoteSigned: '',
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
      startingDate: getDateString(data.startingDate),
      endingDate: getDateString(data.endingDate),
      dateOfBirth: getDateString(data.dateOfBirth),
      dateOfAdmissionStart: getDateString(data.dateOfAdmissionStart),
      dateOfAdmissionEnd: getDateString(data.dateOfAdmissionEnd),
      lastCoverageDateStart: getDateString(data.lastCoverageDateStart),
      lastCoverageDateEnd: getDateString(data.lastCoverageDateEnd),
      isNoteSigned: data.isNoteSigned ? NOTE_SIGNED[data.isNoteSigned] : undefined,
      patientStatuses: data.patientStatuses ? [data.patientStatuses] : [],
      time: data.time? data.time.toString(): undefined,
      providerIds: data.providerIds? [Number(data.providerIds)]: [],
    }
    const sanitizedData = sanitizeFormData(transformedData)
    fetchData({ params: sanitizedData, view: View.List })
  }

  const resetFilters = () => {
    if (!isDirty(dirtyFields)) return
    form.reset()
    fetchData({ view: View.List })
  }

  return (
    <Flex
      direction="column"
      className="bg-white z-10 p-2 shadow-1"
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
            <Grid columns="6" gap="2">
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
