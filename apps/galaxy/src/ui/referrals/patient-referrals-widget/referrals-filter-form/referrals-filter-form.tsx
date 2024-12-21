'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { FormContainer, FormSubmitButton } from '@/components'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { ClearButton } from './clear-button'
import { ContactMadeSelect } from './contact-made-select'
import { FilterToggleButton } from './filter-toggle-button'
import { FromDatePicker } from './from-date-picker'
import { InitiatedBySelect } from './initiated-by-select'
import { NextVisitSelect } from './next-visit-select'
import { PastVisitSelect } from './past-visit-select'
import { ProviderSelect } from './provider-select'
import { ReferralStatusSelect } from './referral-status-select'
import { patientReferralsSchema, PatientReferralsSchemaType } from './schema'
import { ServiceSelect } from './service-select'
import { ServiceStatusSelect } from './service-status-select'
import { ToDatePicker } from './to-date-picker'

const ReferralsFilterForm = () => {
  const store = useStore()
  const {
    loading,
    fetchPatientReferrals,
    showFilters,
    providers,
    fetchStaffOptions,
  } = zustandUseStore(store, (state) => ({
    fetchPatientReferrals: state.fetchPatientReferrals,
    loading: state.loading,
    showFilters: state.showFilters,
    providers: state.providerOptions,
    fetchStaffOptions: state.fetchStaffOptions,
  }))

  const form = useForm<PatientReferralsSchemaType>({
    disabled: loading,
    resolver: zodResolver(patientReferralsSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: {
      contactStatusList: [],
      servicesOfferedList: [],
      resourceStatusList: [],
      fromServiceDate: null,
      toServiceDate: null,
      nextVisit: '',
      initiatedByRole: [],
      providerIds: [],
      serviceStatusList: [],
      visitHx: '',
    },
  })
  const handleFormSubmit = form.handleSubmit((data) => {
    const payload = sanitizeFormData({
      ...data,
      fromServiceDate: formatDateToISOString(data?.fromServiceDate) ?? '',
      toServiceDate: formatDateToISOString(data?.toServiceDate) ?? '',
    })
    fetchPatientReferrals(payload, 1, true)
  })

  useEffect(() => {
    fetchStaffOptions([STAFF_ROLE_CODE_PRESCRIBER])
  }, [fetchStaffOptions])

  return (
    <FormContainer
      form={form}
      onSubmit={() => {}}
      className="flex flex-col gap-2 p-2"
    >
      {showFilters && (
        <>
          <Flex gap="2" align="center" width="100%">
            <ServiceSelect />
            <FromDatePicker />
            <ToDatePicker />
            <ServiceStatusSelect />
            <InitiatedBySelect />
          </Flex>
          <Flex gap="2" align="center" width="100%">
            <ProviderSelect options={providers} />
            <ContactMadeSelect />
            <ReferralStatusSelect />
            <NextVisitSelect />
            <PastVisitSelect />
          </Flex>
        </>
      )}
      <Flex justify="end" gap="2" align="center">
        <FilterToggleButton />
        <ClearButton />
        <FormSubmitButton
          form={form}
          size="1"
          variant="solid"
          onClick={handleFormSubmit}
          highContrast
        >
          <MagnifyingGlassIcon />
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { ReferralsFilterForm }
