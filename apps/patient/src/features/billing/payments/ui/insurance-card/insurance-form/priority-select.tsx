import { ActionErrorState, ActionSuccessState } from '@psychplus-v2/api'
import { CODESETS } from '@psychplus-v2/constants'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
} from '@/components-v2'
import { InsurancePolicy } from '../../../types'
import { InsuranceSchemaType } from '../schema'

interface InsurancePrioritySelectProps {
  insurance?: InsurancePolicy
  form: UseFormReturn<InsuranceSchemaType>
  onSubmit: (
    data: InsuranceSchemaType,
  ) => Promise<ActionErrorState | ActionSuccessState>
}

const InsurancePrioritySelect = ({
  insurance,
  form,
  onSubmit,
}: InsurancePrioritySelectProps) => {
  const handlePriorityChange = (value: string) => {
    onSubmit({
      payerName: insurance?.payerName ?? '',
      insurancePlanId: insurance?.insurancePlanId ?? '',
      effectiveDate: insurance?.effectiveDate ?? '',
      terminationDate: insurance?.terminationDate ?? '',
      memberId: insurance?.memberId ?? '',
      groupNumber: insurance?.groupNumber ?? '',
      isPatientPolicyHolder: insurance?.isPatientPolicyHolder ?? true,
      insurancePolicyPriority: value,
      hasCardFrontImage: insurance?.hasCardFrontImage ?? false,
      hasCardBackImage: insurance?.hasCardBackImage ?? false,
      policyHolderFirstName: insurance?.policyHolderName?.firstName ?? '',
      policyHolderLastName: insurance?.policyHolderName?.lastName ?? '',
      policyHolderGender: insurance?.policyHolderGender ?? '',
      policyHolderDateOfBirth: insurance?.policyHolderDateOfBirth ?? '',
      policyHolderRelationship: insurance?.policyHolderRelationship ?? '',
      policyHolderSocialSecurityNumber:
        insurance?.policyHolderSocialSecurityNumber ?? '',
    })
  }

  return (
    <FormProvider {...form}>
      <FormFieldContainer>
        <CodesetFormSelect
          name="insurancePolicyPriority"
          codeset={CODESETS.InsurancePolicyPriority}
          placeholder="Select priority"
          className="h-[20px] rounded-[2px] [&_span]:text-[12px] "
          onValueChange={handlePriorityChange}
          defaultValue={insurance?.insurancePolicyPriority}
        />
        <FormFieldError name="insurancePolicyPriority" />
      </FormFieldContainer>
    </FormProvider>
  )
}
export default InsurancePrioritySelect
