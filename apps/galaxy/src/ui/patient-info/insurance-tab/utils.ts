'use client'

import { getCalendarDate } from '@/utils'
import { Insurance } from './types'

const getInsuranceFormDefaultValues = (insurance?: Insurance) => ({
  payerName: insurance?.payerName ?? '',
  insurancePlanId: insurance?.insurancePlanId ?? '',
  effectiveDate: insurance?.effectiveDate
    ? getCalendarDate(insurance.effectiveDate).toString()
    : undefined,
  terminationDate: insurance?.terminationDate
    ? getCalendarDate(insurance.terminationDate).toString()
    : undefined,
  memberId: insurance?.memberId ?? '',
  groupNumber: insurance?.groupNumber ?? '',
  isPatientPolicyHolder: insurance?.isPatientPolicyHolder ?? true,
  policyHolderFirstName: insurance?.policyHolderName?.firstName ?? '',
  policyHolderLastName: insurance?.policyHolderName?.lastName ?? '',
  policyHolderGender: insurance?.policyHolderGender ?? '',
  policyHolderDateOfBirth: insurance?.policyHolderDateOfBirth
    ? getCalendarDate(insurance?.policyHolderDateOfBirth).toString()
    : '',
  policyHolderRelationship: insurance?.policyHolderRelationship ?? '',
  insurancePolicyPriority: insurance?.insurancePolicyPriority ?? '',
  policyHolderSocialSecurityNumber:
    insurance?.policyHolderSocialSecurityNumber ?? '',
  hasCardFrontImage: insurance?.hasCardFrontImage ?? false,
  hasCardBackImage: insurance?.hasCardBackImage ?? false,
  verificationStatus: insurance?.verificationStatus ?? 'pending',
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

export { getInsuranceFormDefaultValues, getMinMaxDates }
