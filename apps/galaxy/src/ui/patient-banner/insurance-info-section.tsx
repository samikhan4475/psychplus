import { LabelAndValue } from './label-and-value'
import { InsurancePolicy } from './types'

interface InsuranceInfoSectionProps {
  insurance: InsurancePolicy[]
}

const InsuranceInfoSection = ({ insurance }: InsuranceInfoSectionProps) => {
  const primaryPolicy = insurance.find(
    (policy) => policy.insurancePolicyPriority === 'Primary',
  )

  const secondaryPolicy = insurance.find(
    (policy) => policy.insurancePolicyPriority === 'Secondary',
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
