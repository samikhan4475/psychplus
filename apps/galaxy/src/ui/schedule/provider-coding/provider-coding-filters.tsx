'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { PROVIDER_CODING_FILTERS } from '../constants'
import { FiltersContext } from '../context'
import { AddFiltersPopover, FiltersButtonsGroup } from '../shared'
import { getCalendarDateLabel, getDateString } from '../utils'
import { Age } from './filter-fields/age'
import { BalanceRange } from './filter-fields/bal-range'
import { CoInsuranceRange } from './filter-fields/co-ins-range'
import { CoPayRange } from './filter-fields/copay-range'
import { CPTCode } from './filter-fields/cpt-code'
import { DateOfAdmissionRange } from './filter-fields/date-of-admission-range'
import { Diagnosis } from './filter-fields/diagnosis'
import { DateOfBirthInput } from './filter-fields/dob-input'
import { EndDate } from './filter-fields/end-date'
import { FacilityFilters } from './filter-fields/facility-filters'
import { GenderSelect } from './filter-fields/gender-select'
import { InsuranceVerificationDropdown } from './filter-fields/ins-verification-dropdown'
import { LastCoverageDateRange } from './filter-fields/last-coverage-date-range'
import { LegalStatusDropdown } from './filter-fields/legal-status-dropdown'
import { LengthOfStayRange } from './filter-fields/length-of-stay-range'
import { LocationDropdown } from './filter-fields/location-dropdown'
import { MediumDropdown } from './filter-fields/medium-dropdown'
import { Name } from './filter-fields/name'
import { NoteSignedDropdown } from './filter-fields/note-signed-dropdown'
import { PrimaryInsuranceDropdown } from './filter-fields/primary-insurance-dropdown'
import { ProviderDropdown } from './filter-fields/provider-dropdown'
import { SecondaryInsuranceDropdown } from './filter-fields/secondary-insurance-dropdown'
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
import { FacilityAdmissionIdSelect } from './filter-fields/facility-admission-id-select'

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
  facilityAdmissionIds: '',
}

const ProviderCodingFilters = () => {
  const [filters, setFilters] = useState<string[]>(PROVIDER_CODING_FILTERS)
  const {
    providerCodingFilters,
    saveProviderCodingFilters,
    fetchProviderCodingView,
    setFormData,
  } = useStore((state) => ({
    providerCodingFilters: state.providerCodingFilters,
    saveProviderCodingFilters: state.saveProviderCodingFilters,
    fetchProviderCodingView: state.fetchProviderCodingView,
    setFormData: state.setFormData,
  }))
  const ctxValue = useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters],
  )

  useEffect(() => {
    if (providerCodingFilters.length > 0) {
      setFilters(providerCodingFilters)
    }
  }, [])

  const form = useForm<ProviderCodingSchema>({
    resolver: zodResolver(providerCodingViewSchema),
    criteriaMode: 'all',
    defaultValues: { ...defaultValues },
  })

  const { isDirty } = form.formState

  const onSubmit: SubmitHandler<ProviderCodingSchema> = (data) => {
    if (!isDirty) return
    const {
      startingDate,
      endingDate,
      dateOfBirth,
      dateOfAdmissionStart,
      dateOfAdmissionEnd,
      lastCoverageDateStart,
      lastCoverageDateEnd,
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
      facilityAdmissionIds: data.facilityAdmissionIds
        ? [data.facilityAdmissionIds]
        : '',
    }

    const sanitizedParams = sanitizeFormData(transformedData)
    setFormData(sanitizedParams)
    return fetchProviderCodingView(sanitizedParams)
  }

  const resetFilters = () => {
    if (!isDirty) return
    form.reset()
    setFormData({})
    fetchProviderCodingView()
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
              className="grid w-full grid-cols-[repeat(auto-fill,minmax(235px,1fr))]"
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
              <PrimaryInsuranceDropdown />
              <SecondaryInsuranceDropdown />
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
              <FiltersButtonsGroup resetFilters={resetFilters}>
                <AddFiltersPopover
                  view="Provider Coding"
                  onSave={saveProviderCodingFilters}
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
