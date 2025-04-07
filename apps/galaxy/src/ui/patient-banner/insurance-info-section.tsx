import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { Insurance, VerificationStatus } from '@/types'
import { cn } from '@/utils'

interface InsuranceInfoSectionProps {
  insurance: Insurance[]
}

const InsuranceInfoSection = ({ insurance }: InsuranceInfoSectionProps) => {
  const primaryPolicy = insurance.find(
    (policy) => policy.insurancePolicyPriority === 'Primary',
  )
  const secondaryPolicy = insurance.find(
    (policy) => policy.insurancePolicyPriority === 'Secondary',
  )

  return (
    <Flex gap="1" className="whitespace-nowrap">
      <Text className="text-[11.5px] font-[600]">Insurance</Text>
      {primaryPolicy && secondaryPolicy ? (
        <>
          <Text
            className={cn(
              `text-[11.5px] text-${getVerificationColor(
                primaryPolicy.verificationStatus,
              )}`,
            )}
          >
            {primaryPolicy.policyName}
          </Text>
          <Text className={cn('text-pp-gray-1 text-[11.5px]')}>/</Text>
          <Tooltip content={secondaryPolicy.policyName}>
            <Text
              className={cn(
                `max-w-20 truncate text-[11.5px] text-${getVerificationColor(
                  secondaryPolicy.verificationStatus,
                )}`,
              )}
            >
              {secondaryPolicy.policyName}
            </Text>
          </Tooltip>
        </>
      ) : (
        <Text className="text-[11.5px] italic text-gray-9">N/A</Text>
      )}
    </Flex>
  )
}

export { InsuranceInfoSection }

const getVerificationColor = (status?: string) => {
  if (status === VerificationStatus.Pending) {
    return 'pp-blue'
  } else if (status === VerificationStatus.Verified) {
    return 'pp-states-success'
  } else {
    return 'pp-states-error'
  }
}
