import { Text } from '@radix-ui/themes'
import { getInsuranceInfoAction } from './actions'
import { LabelAndValue } from './label-and-value'

interface PatientBannerProps {
  patientId: string
}

const InsuranceInfoSection = async ({ patientId }: PatientBannerProps) => {
  const response = await getInsuranceInfoAction(patientId)

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const insurance =
    response.data[response.data.length - 1].insurancePolicies ?? []

  const [primaryPolicy, secondaryPolicy] = insurance.filter(
    (policy) =>
      policy.insurancePolicyPriority === 'Primary' ||
      policy.insurancePolicyPriority === 'Secondary',
  )

  return (
    <>
      <LabelAndValue label="Primary Ins" value={primaryPolicy?.policyName} />
      <LabelAndValue
        label="Secondary Ins"
        value={secondaryPolicy?.policyName}
      />
    </>
  )
}

export { InsuranceInfoSection }
