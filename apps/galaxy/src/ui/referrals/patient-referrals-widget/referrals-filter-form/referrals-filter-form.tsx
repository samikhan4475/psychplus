'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { FormContainer, FormSubmitButton } from '@/components'
import { cn, formatDateToISOString, sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { ClearButton } from './clear-button'
import { ContactMadeSelect } from './contact-made-select'
import { FilterToggleButton } from './filter-toggle-button'
import { FromDatePicker } from './from-date-picker'
import { patientReferralsSchema, PatientReferralsSchemaType } from './schema'
import { ServiceSelect } from './service-select'
import { ServiceStatusSelect } from './service-status-select'
import { ToDatePicker } from './to-date-picker'

const ReferralsFilterForm = () => {
  const store = useStore()
  const { loading, fetchPatientReferrals, showFilters } = zustandUseStore(
    store,
    (state) => ({
      fetchPatientReferrals: state.fetchPatientReferrals,
      loading: state.loading,
      showFilters: state.showFilters,
      toggleFilters: state.toggleFilters,
    }),
  )

  const form = useForm<PatientReferralsSchemaType>({
    disabled: loading,
    resolver: zodResolver(patientReferralsSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: {
      contactStatusList: [],
      servicesOfferedList: [],
      resourceStatusList: [],
      fromReferralDate: null,
      toReferralDate: null,
    },
  })

  const handleFormSubmit = form.handleSubmit((data) => {
    const payload = sanitizeFormData({
      contactStatusList: data?.contactStatusList,
      resourceStatusList: data?.resourceStatusList,
      servicesOfferedList: data?.servicesOfferedList,
      fromReferralDate: formatDateToISOString(data?.fromReferralDate) ?? '',
      toReferralDate: formatDateToISOString(data?.toReferralDate) ?? '',
    })
    fetchPatientReferrals(payload, 1, true)
  })

  return (
    <FormContainer
      form={form}
      onSubmit={() => {}}
      className={cn('flex flex-row justify-end gap-1 p-2', {
        'justify-between': showFilters,
      })}
    >
      {showFilters && (
        <Flex gap="2" align="center" width="100%" className="flex-1">
          <FromDatePicker />
          <ToDatePicker />
          <ServiceSelect />
          <ServiceStatusSelect />
          <ContactMadeSelect />
        </Flex>
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
