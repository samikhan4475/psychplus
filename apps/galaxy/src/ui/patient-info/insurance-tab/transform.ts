import { InsuranceSchemaType } from './form-section/schema'
import { InsuranceParams } from './types'

const transformOut = ({
  insurance,
  data,
}: {
  insurance?: { id: string }
  data: Partial<InsuranceSchemaType>
}): InsuranceParams => {
  const basePayload = createBasePayload(insurance, data)

  if (!data.isPatientPolicyHolder) {
    addPolicyHolderFields(basePayload, data)
  }

  return basePayload
}

const createBasePayload = (
  insurance?: { id: string },
  data?: Partial<InsuranceSchemaType>,
): InsuranceParams => ({
  id: insurance?.id,
  payerName: data?.payerName ?? '',
  insurancePlanId: data?.insurancePlanId ?? '',
  effectiveDate: data?.effectiveDate ?? '',
  terminationDate: data?.terminationDate ?? '',
  memberId: data?.memberId ?? '',
  groupNumber: data?.groupNumber ?? '',
  isPatientPolicyHolder: data?.isPatientPolicyHolder ?? true,
  insurancePolicyPriority: data?.insurancePolicyPriority ?? 'Primary',
  hasCardFrontImage: data?.hasCardFrontImage ?? false,
  hasCardBackImage: data?.hasCardBackImage ?? false,
  isActive: data?.isActive ?? false,
  verificationStatus: data?.verificationStatus,
})

const addPolicyHolderFields = (
  payload: InsuranceParams,
  data: Partial<InsuranceSchemaType>,
) => {
  payload.policyHolderName = {
    firstName: data.policyHolderFirstName ?? '',
    lastName: data.policyHolderLastName ?? '',
  }

  payload.policyHolderGender = data.policyHolderGender ?? ''
  payload.policyHolderDateOfBirth = data.policyHolderDateOfBirth ?? ''
  payload.policyHolderRelationship = data.policyHolderRelationship ?? ''
  payload.policyHolderSocialSecurityNumber =
    data.policyHolderSocialSecurityNumber ?? ''
  payload.contactInfo = {
    addresses: [
      {
        type: 'Home',
        street1: data.address1 ?? '',
        street2: data.address2 ?? '',
        city: data.city ?? '',
        state: data.state ?? '',
        postalCode: data.zip ?? '',
        postalPlus4Code: data.postalPlus4Code ?? '',
      },
    ],
  }
}

export { transformOut }
