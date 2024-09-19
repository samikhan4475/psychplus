'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { AgeInput } from './age-input'
import { BalanceRange } from './balance-range'
import { CoInsuranceRange } from './co-insurance-range'
import { RoundingFiltersContext } from './context'
import { CoPayRange } from './copay-range'
import { CptCodeInput } from './cpt-code-input'
import { DateOfAdmissionRange } from './date-of-admission-range'
import { DiagnosisInput } from './diagnosis-input'
import { DateOfBirthInput } from './dob-input'
import { EndDateInput } from './end-date-input'
import { FiltersActionGroup } from './filter-actions-group'
import { GenderSelect } from './gender-select'
import { GroupDropdown } from './group-select'
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
import { RoomDropdown } from './room-dropdown'
import { SecondaryInsuranceDropdown } from './seondary-insurance-select'
import { ServiceDropdown } from './service-dropdown'
import { StartDateInput } from './start-date-input'
import { UnitDropdown } from './unit-dropdown'
import { VisitMediumSelect } from './visit-medium-select'
import { VisitSequenceSelect } from './visit-sequence-select'
import { VisitStatus } from './visit-status'
import { VisitTypeSelect } from './visit-type-select'

const schema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  name: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
  dob: z.date().optional(),
  ptStatus: z.string().optional(),
  location: z.string().optional(),
  service: z.string().optional(),
  providerType: z.string().optional(),
  unit: z.string().optional(),
  room: z.string().optional(),
  group: z.string().optional(),
  primaryInsurance: z.string().optional(),
  secondaryInsurance: z.string().optional(),
  visitType: z.string().optional(),
  visitSequence: z.string().optional(),
  visitMedium: z.string().optional(),
  visitStatus: z.string().optional(),
  insVerification: z.string().optional(),
  diagnosis: z.string().optional(),
  cptCode: z.string().optional(),
  doaFrom: z.date().optional(),
  doaTo: z.date().optional(),
  losFrom: z.date().optional(),
  losTo: z.date().optional(),
  lcdFrom: z.date().optional(),
  lcdTo: z.date().optional(),
  legal: z.string().optional(),
  copayFrom: z.string().optional(),
  copayTo: z.string().optional(),
  coInsFrom: z.string().optional(),
  coInsTo: z.string().optional(),
  balanceFrom: z.string().optional(),
  balanceTo: z.string().optional(),
  noteSigned: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const RoundingViewFilterCard = () => {
  const [filters, setFilters] = useState<string[]>([])
  const cachedFilters = useStore((state) => state.cachedFilters)
  const ctxValue = useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters],
  )

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      name: '',
      age: undefined,
      gender: '',
      dob: undefined,
      ptStatus: '',
      location: '',
      service: '',
      providerType: '',
      unit: '',
      room: '',
      group: '',
      primaryInsurance: '',
      secondaryInsurance: '',
      visitType: '',
      visitSequence: '',
      visitMedium: '',
      visitStatus: '',
      insVerification: '',
      diagnosis: '',
      cptCode: '',
      doaFrom: undefined,
      doaTo: undefined,
      losFrom: undefined,
      losTo: undefined,
      lcdFrom: undefined,
      lcdTo: undefined,
      legal: '',
      copayFrom: '',
      copayTo: '',
      coInsFrom: '',
      coInsTo: '',
      balanceFrom: '',
      balanceTo: '',
      noteSigned: '',
    },
  })

  useEffect(() => {
    if (cachedFilters.length > 0) {
      setFilters(cachedFilters)
    }
  }, [])

  const onSubmit: SubmitHandler<SchemaType> = () => {
    //TODO: implement when integrating APIs
  }

  return (
    <Flex
      direction="column"
      className="bg-white z-10 mx-[26px] p-2 shadow-3"
      position="sticky"
      top="0"
    >
      <RoundingFiltersContext.Provider value={ctxValue}>
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
              <UnitDropdown />
              <RoomDropdown />
              <GroupDropdown />
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
              <FiltersActionGroup />
            </Grid>
          </Flex>
        </FormContainer>
      </RoundingFiltersContext.Provider>
    </Flex>
  )
}

export { RoundingViewFilterCard }
