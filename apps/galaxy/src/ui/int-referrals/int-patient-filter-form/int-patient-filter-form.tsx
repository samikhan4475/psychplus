'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DateValue } from '@internationalized/date'
import { Flex, Grid } from '@radix-ui/themes'
import {
  SubmitErrorHandler,
  useForm,
  type SubmitHandler,
} from 'react-hook-form'
import { useStore as zustandUseStore } from 'zustand'
import { FormContainer } from '@/components'
import { FormError } from '@/components/form'
import { CODESETS, STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import {
  transformOutProviderNames,
  transformOutStateValue,
} from '@/ui/referrals/patient-referrals-widget/transform'
import {
  formatDateToISOString,
  getOptionalDateString,
  sanitizeFormData,
} from '@/utils'
import { useStore } from '../store'
import { getInitialValues, hasFieldErrors } from '../utils'
import { ClearButton } from './clear-button'
import { FilterButton } from './filter-button'
import { Filters } from './filters'
import {
  IntReferralsPatientLookUpSchemaType,
  patientLookupSchema,
} from './schema'
import { SubmitButton } from './submit-button'

const IntReferralsForm = () => {
  const store = useStore()
  const {
    error,
    loading,
    showFilters,
    toggleFilters,
    fetchPatientReferrals,
    providers,
    fetchStaffOptions,
  } = zustandUseStore(store, (state) => ({
    fetchPatientReferrals: state.fetchPatientReferrals,
    error: state.error,
    loading: state.loading,
    showFilters: state.showFilters,
    toggleFilters: state.toggleFilters,
    providers: state.providerOptions,
    fetchStaffOptions: state.fetchStaffOptions,
  }))
  const usStates = useCodesetOptions(CODESETS.UsStates)
  useEffect(() => {
    fetchStaffOptions([STAFF_ROLE_CODE_PRESCRIBER])
  }, [fetchStaffOptions])

  const form = useForm<IntReferralsPatientLookUpSchemaType>({
    disabled: loading,
    resolver: zodResolver(patientLookupSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
    defaultValues: getInitialValues(),
  })

  const onSubmit: SubmitHandler<IntReferralsPatientLookUpSchemaType> = (
    data,
  ) => {
    const payload = sanitizeFormData({
      ...data,
      dateOfBirth: getOptionalDateString(data?.dateOfBirth) as
        | DateValue
        | undefined,
      fromReferralDate:
        formatDateToISOString(data?.fromReferralDate) ?? undefined,
      toReferralDate:
        formatDateToISOString(data?.toReferralDate, true) ?? undefined,
      providerNames: transformOutProviderNames(data?.providerNames) ?? [],
      stateOfResidenceCode:
        transformOutStateValue(data?.stateOfResidenceCode, usStates) ?? '',
    })

    return fetchPatientReferrals(payload, 1, true)
  }

  const onError: SubmitErrorHandler<IntReferralsPatientLookUpSchemaType> = (
    errors,
  ) => {
    if (!showFilters && hasFieldErrors(errors)) {
      toggleFilters()
    }
  }

  return (
    <Flex direction="column" gap="1" className="bg-white" py="3" px="4">
      <FormError message={error} />
      <Flex gap="4">
        <FormContainer form={form} onSubmit={onSubmit} onError={onError}>
          <Grid columns="4" gap="2" align="baseline">
            {showFilters && <Filters options={providers} />}

            <Flex
              className="col-span-full"
              justify="end"
              gap="2"
              align="center"
            >
              <FilterButton />
              <ClearButton />
              <SubmitButton />
            </Flex>
          </Grid>
        </FormContainer>
      </Flex>
    </Flex>
  )
}

export { IntReferralsForm }
