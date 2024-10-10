'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { NOTE_SIGNED, ROUNDING_FILTERS } from '../constants'
import { FiltersContext } from '../context'
import {
  bookedAppointmentsSchema,
  BookedAppointmentsSchemaType,
} from '../schema'
import { AddFiltersPopover, FacilityFields, FiltersButtonsGroup } from '../shared'
import { useBookedAppointmentsStore, useStore } from '../store'
import { View } from '../types'
import { getDateString, isDirty } from '../utils'
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
import { PrimaryInsuranceDropdown } from './primary-insurance-select'
import { ProviderTypeDropdown } from './provider-type-dropdown'
import { SecondaryInsuranceDropdown } from './seondary-insurance-select'
import { ServiceDropdown } from './service-dropdown'
import { StartDateInput } from './start-date-input'
import { VisitMediumSelect } from './visit-medium-select'
import { VisitSequenceSelect } from './visit-sequence-select'
import { VisitStatus } from './visit-status'
import { VisitTypeSelect } from './visit-type-select'

const defaultValues = {
  startingDate: undefined,
  endingDate: undefined,
  name: '',
  age: undefined,
  gender: '',
  dateOfBirth: undefined,
  patientStatuses: '',
  locationId: '',
  serviceIds: [],
  providerType: '',
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
}

const RoundingViewFilterCard = () => {
  const [filters, setFilters] = useState<string[]>(ROUNDING_FILTERS)
  const fetchData = useBookedAppointmentsStore((state) => state.fetchData)
  const { cachedFilters, saveFilters } = useStore((state) => ({
    cachedFilters: state.cachedFiltersRounding,
    saveFilters: state.saveRoundingFilters,
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
    defaultValues: { ...defaultValues },
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
      isNoteSigned,
      patientStatuses,
    } = data
    const transformedData = {
      ...data,
      startingDate: getDateString(startingDate),
      endingDate: getDateString(endingDate),
      dateOfBirth: getDateString(dateOfBirth),
      dateOfAdmissionStart: getDateString(dateOfAdmissionStart),
      dateOfAdmissionEnd: getDateString(dateOfAdmissionEnd),
      lastCoverageDateStart: getDateString(lastCoverageDateStart),
      lastCoverageDateEnd: getDateString(lastCoverageDateEnd),
      isNoteSigned: isNoteSigned? NOTE_SIGNED[isNoteSigned]: undefined,
      patientStatuses: patientStatuses ? [patientStatuses] : [],
      providerIds: [],
    }

    const sanitizedParams = sanitizeFormData(transformedData)
    fetchData({ params: sanitizedParams, view: View.Rounding })
  }

  const resetFilters = () => {
    if (!isDirty(dirtyFields)) return
    form.reset()
    fetchData({ view: View.Rounding })
  }

  return (
    <Flex
      direction="column"
      className="bg-white z-10 mx-[26px] p-2 shadow-3"
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
            <Grid columns="6" gap="2">
              <ProviderTypeDropdown />
              <FacilityFields />
              <PrimaryInsuranceDropdown />
              <SecondaryInsuranceDropdown />
              <VisitTypeSelect />
              <VisitSequenceSelect />
              <VisitMediumSelect />
              <VisitStatus />
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
