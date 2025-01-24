'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
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
import { getCalendarDateLabel, getDateString, isDirty } from '../utils'
import { AgeInput } from './age-input'
import { BalanceRange } from './balance-range'
import { CoInsuranceRange } from './co-insurance-range'
import { CoPayRange } from './copay-range'
import { CptCodeInput } from './cpt-code-input'
import { DateOfAdmissionRange } from './date-of-admission-range'
import { DiagnosisInput } from './diagnosis-input'
import { DateOfBirthInput } from './dob-input'
import { EndDateInput } from './end-date-input'
import { GenderSelect } from './gender-select'
import { InsuranceVerificationSelect } from './insurance-verification'
import { LastCoverageDateRange } from './last-coverage-date-range'
import { LegalStatusSelect } from './legal-status-select'
import { LengthOfStayRange } from './length-of-stay-range'
import { LocationDropdown } from './location-dropdown'
import { NameInput } from './name-input'
import { NoteSignedSelect } from './note-signed-select'
import { PatientStatusSelect } from './patient-status-select'
import { ProviderTypeDropdown } from './provider-type-dropdown'
import { ServiceDropdown } from './service-dropdown'
import { StartDateInput } from './start-date-input'
import { useStore } from './store'
import { VisitMediumSelect } from './visit-medium-select'
import { VisitSequenceSelect } from './visit-sequence-select'
import { VisitStatusSelect } from './visit-status'
import { VisitTypeSelect } from './visit-type-select'
import { InsuranceFilters } from './insurance-filters'

const RoundingViewFilterCard = () => {
  const [filters, setFilters] = useState<string[]>(ROUNDING_FILTERS)
  const { cachedFilters, saveFilters } = useRootStore((state) => ({
    cachedFilters: state.cachedFiltersRounding,
    saveFilters: state.saveRoundingFilters,
  }))
  const fetchData = useStore((state) => state.fetchAppointments)

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
      name: '',
      age: undefined,
      gender: '',
      dateOfBirth: undefined,
      patientStatuses: '',
      locationIds: [],
      serviceIds: [],
      providerType: '',
      unitId: '',
      roomId: '',
      stateIds: [],
      groupId: '',
      primaryInsuranceName: '',
      secondaryInsuranceName: '',
      visitType: '',
      visitSequence: '',
      visitMedium: '',
      appointmentStatus: '',
      patientInsuranceVerificationStatus: '',
      diagnosisCode: '',
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
    const {
      startingDate,
      endingDate,
      dateOfBirth,
      dateOfAdmissionStart,
      dateOfAdmissionEnd,
      lastCoverageDateStart,
      lastCoverageDateEnd,
      patientStatuses,
    } = data
    const transformedData = {
      ...data,
      startingDate: getDateString(startingDate),
      endingDate: getDateString(endingDate),
      dateOfBirth: getCalendarDateLabel(dateOfBirth),
      dateOfAdmissionStart: getDateString(dateOfAdmissionStart),
      dateOfAdmissionEnd: getDateString(dateOfAdmissionEnd),
      lastCoverageDateStart: getDateString(lastCoverageDateStart),
      lastCoverageDateEnd: getDateString(lastCoverageDateEnd),
      patientStatuses: patientStatuses ? [patientStatuses] : [],
      providerIds: [],
    }

    const sanitizedParams = sanitizeFormData(transformedData)
    fetchData(sanitizedParams, 1)
  }

  const resetFilters = () => {
    if (!isDirty(dirtyFields)) return
    form.reset()
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
              <FiltersButtonsGroup resetFilters={resetFilters}>
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
