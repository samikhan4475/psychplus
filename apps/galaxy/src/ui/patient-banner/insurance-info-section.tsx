import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { Insurance, InsurancePolicyPriority, VerificationStatus } from '@/types'
import { cn } from '@/utils'

interface InsuranceInfoSectionProps {
  insurance: Insurance[]
}

const InsuranceInfoSection = ({ insurance }: InsuranceInfoSectionProps) => {
  const primary = insurance?.find(
    (i) => i.insurancePolicyPriority === InsurancePolicyPriority.Primary,
  )
  const secondary = insurance?.find(
    (i) => i.insurancePolicyPriority === InsurancePolicyPriority.Secondary,
  )
  const hasInsurance = primary || secondary

  return (
    <Flex gap="1" className="items-center whitespace-nowrap">
      <Text className="text-[11.5px] font-[600]">Insurance</Text>

      {hasInsurance ? (
        <>
          {primary && (
            <Text
              className={cn(
                'text-[11.5px]',
                `text-${getVerificationColor(primary.verificationStatus)}`,
              )}
            >
              {primary.policyName}
            </Text>
          )}

          {secondary && (
            <>
              {primary && (
                <Text className="text-pp-gray-1 text-[11.5px]">/</Text>
              )}
              <Tooltip content={secondary.policyName}>
                <Text
                  className={cn(
                    'max-w-20 truncate text-[11.5px]',
                    `text-${getVerificationColor(
                      secondary.verificationStatus,
                    )}`,
                  )}
                >
                  {secondary.policyName}
                </Text>
              </Tooltip>
            </>
          )}
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
