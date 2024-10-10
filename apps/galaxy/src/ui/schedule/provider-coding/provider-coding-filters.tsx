'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { PROVIDER_CODING_FILTERS } from '../constants'
import { FiltersContext } from '../context'
import { AddFiltersPopover, FiltersButtonsGroup } from '../shared'
import { useStore } from '../store'
import { Age } from './filter-fields/age'
import { BalanceRange } from './filter-fields/bal-range'
import { CoInsuranceRange } from './filter-fields/co-ins-range'
import { CoPayRange } from './filter-fields/copay-range'
import { CPTCode } from './filter-fields/cpt-code'
import { DateOfAdmissionRange } from './filter-fields/date-of-admission-range'
import { Diagnosis } from './filter-fields/diagnosis'
import { DateOfBirthInput } from './filter-fields/dob-input'
import { EndDate } from './filter-fields/end-date'
import { GenderSelect } from './filter-fields/gender-select'
import { GroupSelect } from './filter-fields/group-dropdown'
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
import { RoomDropdown } from './filter-fields/room-dropdown'
import { SecondaryInsuranceDropdown } from './filter-fields/secondary-insurance-dropdown'
import { SequenceDropdown } from './filter-fields/sequence-dropdown'
import { ServiceMultiSelect } from './filter-fields/service-multiselect'
import { StartDate } from './filter-fields/start-date'
import { StatusDropdown } from './filter-fields/status-dropdown'
import { UnitSelect } from './filter-fields/units-dropdown'
import { VisitTypeDropdown } from './filter-fields/visit-type-dropdown'
import {
  ProviderCodingSchema,
  providerCodingViewSchema,
} from './provider-coding-view-schema'

const ProviderCodingFilters = () => {
  const [filters, setFilters] = useState<string[]>(PROVIDER_CODING_FILTERS)
  const { providerCodingFilters, saveProviderCodingFilters } = useStore(
    (state) => ({
      providerCodingFilters: state.providerCodingFilters,
      saveProviderCodingFilters: state.saveProviderCodingFilters,
    }),
  )
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
    defaultValues: {},
  })

  const onSubmit: SubmitHandler<ProviderCodingSchema> = () => {
    //TODO: implement when integrating APIs
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
              <StartDate />
              <EndDate />
              <Name />
              <Age />
              <GenderSelect />
              <DateOfBirthInput />
              <LocationDropdown />
              <ServiceMultiSelect />
            </Flex>
            <Flex align="start" width="100%" gap="2">
              <ProviderDropdown />
              <UnitSelect />
              <RoomDropdown />
              <GroupSelect />
              <PrimaryInsuranceDropdown />
              <SecondaryInsuranceDropdown />
            </Flex>
            <Flex align="start" width="100%" gap="2">
              <VisitTypeDropdown />
              <SequenceDropdown />
              <MediumDropdown />
              <StatusDropdown />
              <InsuranceVerificationDropdown />
              <Diagnosis />
            </Flex>
            <Flex align="start" width="100%" gap="2">
              <CPTCode />
              <DateOfAdmissionRange />
              <LengthOfStayRange />
              <LastCoverageDateRange />
              <LegalStatusDropdown />
              <CoPayRange />
            </Flex>
            <Grid columns="6" gap="2">
              <CoInsuranceRange />
              <BalanceRange />
              <NoteSignedDropdown />
              <FiltersButtonsGroup>
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
