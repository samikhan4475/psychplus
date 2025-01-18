import { EmptyFileIcon, FeatureEmpty, FieldPlaceholder } from '@/components-v2'
import { Flex, Separator } from '@radix-ui/themes'
import { InsurancePolicyPriority } from '@/features/billing/payments/constants'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { InsuranceForm } from './insurance-form'
import { InsuranceFormTrigger } from './Insurance-form-trigger'
import { cn } from '@psychplus-v2/utils'
import { VerificationStatus } from '@/types'

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
            <Flex className="w-full" direction="column" key={insurance.id}>
              <InsuranceFormTrigger
                isReadOnly={
                  insurance.verificationStatus === VerificationStatus.Verified
                }
                key={insurance.id}
                insurance={insurance}
                insurancePayers={insurancePayers}
              />
              <Separator className="w-full" my="4" />
            </Flex>
          ))}
        </Flex>
      ) : (
        <FeatureEmpty description="No insurance added yet" Icon={EmptyFileIcon} />
      )}

      
      <InsuranceForm
        insurancePriority={insurancePriority}
        insurancePayers={insurancePayers}
        trigger={
          <Flex 
            width="100%" 
            justify={patientInsurances.length < 1 ? 'center' : 'start'} 
            className={cn({
              '-mt-12': patientInsurances.length < 1,
            })}
          >
            <FieldPlaceholder>+ Add New Insurance</FieldPlaceholder>
          </Flex>
        }
      />
    </Flex>
  )
}

export { InsuranceForms }
