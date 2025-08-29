import { cn } from '@psychplus-v2/utils'
import { Flex, Separator } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty, TriggerButton } from '@/components-v2'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { VerificationStatus } from '@/types'
import { InsuranceForm } from './insurance-form'
import { InsuranceFormTrigger } from './Insurance-form-trigger'

interface InsuranceFormProps {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance
}

const InsuranceForms = ({
  insurancePayers,
  patientInsurances,
}: InsuranceFormProps) => {
  return (
    <Flex direction="column" gap="2">
      {patientInsurances.policies ? (
        <Flex direction="column" gap="2">
          {patientInsurances.policies.map((insurance) => (
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
        <FeatureEmpty
          description="No insurance added yet"
          Icon={EmptyFileIcon}
        />
      )}

      <InsuranceForm
        insurancePayers={insurancePayers}
        trigger={
          <Flex
            width="100%"
            justify={!patientInsurances.policies ? 'center' : 'start'}
            className={cn({
              '-mt-12': !patientInsurances.policies,
            })}
          >
            <TriggerButton title="Add New Insurance" />
          </Flex>
        }
      />
    </Flex>
  )
}

export { InsuranceForms }
