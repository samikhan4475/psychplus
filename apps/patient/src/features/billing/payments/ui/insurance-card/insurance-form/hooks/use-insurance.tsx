import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCalendarDate } from '@psychplus-v2/utils'
import { useForm } from 'react-hook-form'
import { InsurancePolicy } from '@/features/billing/payments/types'
import { getInsuranceSchema, InsuranceSchemaType } from '../../schema'

const getFormDefaultValues = (insurance?: InsurancePolicy) => ({
  payerName: insurance?.payerName ?? '',
  insurancePlanId: insurance?.insurancePlanId ?? '',
  effectiveDate: insurance?.effectiveDate
    ? getCalendarDate(insurance.effectiveDate).toString()
    : '',
  terminationDate: insurance?.terminationDate
    ? getCalendarDate(insurance.terminationDate).toString()
    : '',
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
})

export const useInsuranceFormLogic = (insurance?: InsurancePolicy) => {
  const form = useForm<InsuranceSchemaType>({
    resolver: zodResolver(getInsuranceSchema(true)),
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: getFormDefaultValues(insurance),
  })

  const { register, watch, unregister, reset, clearErrors } = form
  const watchisPatientPolicyHolder = watch('isPatientPolicyHolder')

  const hasChanges = () => {
    const currentValues = form.getValues()
    const defaultValues = getFormDefaultValues(insurance)
    return Object.keys(defaultValues).some((key) => {
      return (
        defaultValues[key as keyof typeof defaultValues] !==
        currentValues[key as keyof typeof currentValues]
      )
    })
  }

  const onCheckedChange = (isPolicyHolder: boolean) => {
    if (isPolicyHolder) {
      clearErrors('policyHolderFirstName')
      clearErrors('policyHolderLastName')
      clearErrors('policyHolderDateOfBirth')
      clearErrors('policyHolderGender')
      clearErrors('policyHolderRelationship')
    }
    form.setValue('isPatientPolicyHolder', isPolicyHolder, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  useEffect(() => {
    if (!watchisPatientPolicyHolder) {
      register('policyHolderFirstName')
      register('policyHolderLastName')
      register('policyHolderDateOfBirth')
      register('policyHolderGender')
      register('policyHolderRelationship')
    } else {
      unregister('policyHolderFirstName')
      unregister('policyHolderLastName')
      unregister('policyHolderDateOfBirth')
      unregister('policyHolderGender')
      unregister('policyHolderRelationship')
    }
  }, [register, unregister, watchisPatientPolicyHolder])

  useEffect(() => {
    if (insurance) {
      reset(getFormDefaultValues(insurance))
    } else {
      reset({
        ...getFormDefaultValues(),
        isPatientPolicyHolder: true,
      })
    }
  }, [insurance, reset])

  return {
    form,
    watchisPatientPolicyHolder,
    hasChanges,
    onCheckedChange,
  }
}
