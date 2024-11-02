'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { FormContainer } from '@/components'
import { cn, formatDateToISOString, sanitizeFormData } from '@/utils'
import { useStore } from '../store'
import { ClearButton } from './clear-button'
import { ContactMadeSelect } from './contact-made-select'
import { FilterToggleButton } from './filter-toggle-button'
import { FromDatePicker } from './from-date-picker'
import { patientReferralsSchema, PatientReferralsSchemaType } from './schema'
import { ServiceSelect } from './service-select'
import { ServiceStatusSelect } from './service-status-select'
import { SubmitButton } from './submit-button'
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

  const onSubmit: SubmitHandler<PatientReferralsSchemaType> = (data) => {
    const payload = sanitizeFormData({
      contactStatusList: data?.contactStatusList,
      resourceStatusList: data?.resourceStatusList,
      servicesOfferedList: data?.servicesOfferedList,
      fromReferralDate: formatDateToISOString(data?.fromReferralDate) ?? '',
      toReferralDate: formatDateToISOString(data?.toReferralDate) ?? '',
    })
    return fetchPatientReferrals(payload, 1, true)
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
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
        <SubmitButton />
      </Flex>
    </FormContainer>
  )
}

export { ReferralsFilterForm }
