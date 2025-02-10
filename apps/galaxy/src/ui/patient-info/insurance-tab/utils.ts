'use client'

import { UseFormRegister, UseFormUnregister } from 'react-hook-form'
import { Insurance } from '@/types'
import { getCalendarDate } from '@/utils'
import { InsuranceSchemaType } from './form-section/schema'

const getOptionalDate = (date?: string) =>
  date ? getCalendarDate(date).toString() : undefined

const getPolicyHolderDefaults = (insurance?: Insurance) => ({
  policyHolderFirstName: insurance?.policyHolderName?.firstName ?? '',
  policyHolderLastName: insurance?.policyHolderName?.lastName ?? '',
  policyHolderGender: insurance?.policyHolderGender ?? '',
  policyHolderDateOfBirth:
    getOptionalDate(insurance?.policyHolderDateOfBirth) ?? '',
  policyHolderRelationship: insurance?.policyHolderRelationship ?? '',
  policyHolderSocialSecurityNumber:
    insurance?.policyHolderSocialSecurityNumber ?? '',
})

const getAddressDefaults = (insurance?: Insurance) => {
  const address = insurance?.contactInfo?.addresses?.[0]

  return {
    address1: address?.street1 ?? '',
    address2: address?.street2 ?? '',
    city: address?.city ?? '',
    state: address?.state ?? '',
    zip: address?.postalCode ?? '',
  }
}

const getInsuranceFormDefaultValues = (insurance?: Insurance) => ({
  payerName: insurance?.payerName ?? '',
  insurancePlanId: insurance?.insurancePlanId ?? '',
  effectiveDate: getOptionalDate(insurance?.effectiveDate),
  terminationDate: getOptionalDate(insurance?.terminationDate),
  memberId: insurance?.memberId ?? '',
  groupNumber: insurance?.groupNumber ?? '',
  isPatientPolicyHolder: insurance?.isPatientPolicyHolder ?? true,
  insurancePolicyPriority: insurance?.insurancePolicyPriority ?? '',
  hasCardFrontImage: insurance?.hasCardFrontImage ?? false,
  hasCardBackImage: insurance?.hasCardBackImage ?? false,
  verificationStatus: insurance?.verificationStatus ?? 'Pending',
  isActive: insurance?.isActive ?? true,
  ...getPolicyHolderDefaults(insurance),
  ...getAddressDefaults(insurance),
})
const getMinMaxDates = () => {
  const today = new Date()

  // Calculate max date (yesterday)
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)
  const formattedMaxDate = yesterday.toISOString().split('T')[0]

  // Format min date as today
  const formattedMinDate = today.toISOString().split('T')[0]

  return {
    minDate: formattedMinDate,
    maxDate: formattedMaxDate,
  }
}

const policyHolderFields: Array<keyof InsuranceSchemaType> = [
  'policyHolderFirstName',
  'policyHolderLastName',
  'policyHolderDateOfBirth',
  'policyHolderGender',
  'policyHolderRelationship',
  'address1',
  'address2',
  'city',
  'state',
  'zip',
]
const registerPolicyHolderFields = (
  register: UseFormRegister<InsuranceSchemaType>,
) => {
  policyHolderFields.forEach((field) => register(field))
}

const unregisterPolicyHolderFields = (
  unregister: UseFormUnregister<InsuranceSchemaType>,
) => {
  policyHolderFields.forEach((field) => unregister(field))
}

export {
  getInsuranceFormDefaultValues,
  getMinMaxDates,
  registerPolicyHolderFields,
  unregisterPolicyHolderFields,
}
