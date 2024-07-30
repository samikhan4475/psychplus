import { Flex } from '@radix-ui/themes'
import { FieldPlaceholder } from '@/components-v2'
import { InsurancePolicyPriority } from '@/features/billing/payments/constants'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { InsuranceForm } from './insurance-form'
import { InsuranceFormTrigger } from './Insurance-form-trigger'

interface InsuranceFormProps {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance[]
}

const InsuranceForms = ({
  insurancePayers,
  patientInsurances,
}: InsuranceFormProps) => {
  const hasPrimaryInsurance = patientInsurances.some(
    (insurance) =>
      insurance.insurancePolicyPriority === InsurancePolicyPriority.Primary,
  )
  const hasSecondaryInsurance = patientInsurances.some(
    (insurance) =>
      insurance.insurancePolicyPriority === InsurancePolicyPriority.Secondary,
  )
  const hasTertiaryInsurance = patientInsurances.some(
    (insurance) =>
      insurance.insurancePolicyPriority === InsurancePolicyPriority.Tertiary,
  )

  let insurancePriority = InsurancePolicyPriority.Other

  if (!hasPrimaryInsurance) {
    insurancePriority = InsurancePolicyPriority.Primary
  } else if (!hasSecondaryInsurance) {
    insurancePriority = InsurancePolicyPriority.Secondary
  } else if (!hasTertiaryInsurance) {
    insurancePriority = InsurancePolicyPriority.Tertiary
  }

  return (
    <Flex direction="column" gap="2">
      {patientInsurances.length > 0 ? (
        <Flex direction="column" gap="2">
          {patientInsurances.map((insurance) => (
            <InsuranceForm
              key={insurance.id}
              insurance={insurance}
              insurancePayers={insurancePayers}
              insurancePriority={
                insurance.insurancePolicyPriority as InsurancePolicyPriority
              }
              trigger={<InsuranceFormTrigger insurance={insurance} />}
            />
          ))}
        </Flex>
      ) : null}
      <InsuranceForm
        insurancePriority={insurancePriority}
        insurancePayers={insurancePayers}
        trigger={<FieldPlaceholder>+ add insurance</FieldPlaceholder>}
      />
    </Flex>
  )
}

export { InsuranceForms }
