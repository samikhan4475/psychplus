'use client'

import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { LIST_VIEW_FILTERS } from '../constants'
import { AddFiltersPopover, FiltersButtonsGroup } from '../shared'
import { useStore } from '../store'
import {
  AgeInput,
  BalanceInputRange,
  CoInsuranceInputRange,
  CoPayInputRange,
  DateOfAdmissionRange,
  DateOfBirthInput,
  EndDateInput,
  GenderSelect,
  GroupDropdown,
  InsuranceVerificationSelect,
  LastCoverageDateRange,
  LegalStatusSelect,
  LengthOfStayRange,
  NameInput,
  NoteSignedSelect,
  PatientStatusSelect,
  PrimaryInsuranceDropdown,
  ProviderTypeDropdown,
  RoomDropdown,
  SecondaryInsuranceDropdown,
  StartDateInput,
  UnitDropdown,
  VisitMediumSelect,
  VisitSequenceSelect,
  VisitStatusSelect,
  VisitTypeSelect,
} from './filter-fields'
import { AuthorizationNumberInput } from './filter-fields/authorization-number-input'
import { LocationDropdown } from './filter-fields/location-dropdown'
import { ProviderDropdown } from './filter-fields/provider-dropdown'
import { ServiceMultiSelect } from './filter-fields/service-multiselect'
import { StateSelect } from './filter-fields/state-select'
import { TimeInputField } from './filter-fields/time-input-field'
import { FiltersContext } from '../context'
import {listViewSchema, type ListViewSchema } from './list-view-schema'

const ListViewFilterCard = () => {
  const [filters, setFilters] = useState<string[]>(LIST_VIEW_FILTERS)
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

  const form = useForm<ListViewSchema>({
    resolver: zodResolver(listViewSchema),
    criteriaMode: 'all',
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      name: '',
      age: undefined,
      gender: '',
      dob: undefined,
      ptStatus: '',
      state: '',
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
      authorizationNumber: '',
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

  const onSubmit: SubmitHandler<ListViewSchema> = () => {
    //TODO: implement when integrating APIs
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
              <UnitDropdown />
              <RoomDropdown />
              <GroupDropdown />
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
              <FiltersButtonsGroup>
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
