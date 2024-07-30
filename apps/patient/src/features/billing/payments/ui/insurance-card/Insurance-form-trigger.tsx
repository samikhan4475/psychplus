import { getSlashedDateString } from '@psychplus-v2/utils'
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { Badge, EditableFieldValue } from '@/components-v2'
import {
  Insurance,
  InsuranceChipVariantType,
} from '@/features/billing/payments/types'

const InsuranceFormTrigger = ({ insurance }: { insurance: Insurance }) => {
  const getStatusVariant = (
    variantType: keyof typeof InsuranceChipVariantType,
  ): string => {
    return InsuranceChipVariantType[variantType] || 'basic'
  }

  const trigger = (
    <>
      <Box className="mb-2 pb-4 last:mb-0">
        <Flex align="center" justify="between" className="mb-3" width="100%">
          <Flex align="center" gap="2">
            <Heading weight="medium" size="4" className="font-sans text-[18px]">
              {insurance.payerName}
            </Heading>

            <Text className="text-white rounded-[6px] bg-[#3D4149] px-3 py-[3px] text-[12px]">
              {insurance.insurancePolicyPriority}
            </Text>
          </Flex>

          <Flex align="center" gap="3">
            <EditableFieldValue />
            <Separator orientation="vertical" />
          </Flex>
        </Flex>

        <Flex align="center" gap="1" className="mb-2">
          <Badge
            label={insurance.verificationStatus}
            type={getStatusVariant(
              insurance.verificationStatus as keyof typeof InsuranceChipVariantType,
            )}
            addIcon={true}
          />

          <Badge label={`Member ID: ${insurance.memberId}`} type="basic" />

          <Badge label={`Group ID: ${insurance.groupNumber}`} type="basic" />
        </Flex>

        <Flex align="center" gap="5">
          <Text className="text-[12px] relative text-[#60646C] after:text-[32px] after-ml-[9px] after:leading-[4px] after:content-['.'] after:absolute after:top-[-1px] after:ml-[9px] last:after:hidden">
            <span className="font-medium text-[#1C2024]">Effective Date: </span>
            {getSlashedDateString(insurance.effectiveDate)}
          </Text>

          <Text className="text-[12px] relative text-[#60646C] after:text-[32px] after-ml-[9px] after:leading-[4px] after:content-['.'] after:absolute after:top-[-1px] after:ml-[9px] last:after:hidden">
            <span className="font-medium text-[#1C2024]">Term Date: </span>{' '}
            {getSlashedDateString(insurance.terminationDate)}
          </Text>

          <Text className="text-[12px] relative text-[#60646C] after:text-[32px] after-ml-[9px] after:leading-[4px] after:content-['.'] after:absolute after:top-[-1px] after:ml-[9px] last:after:hidden">
            <span className="font-medium text-[#1C2024]">
              Primary Holder Name:{' '}
            </span>{' '}
            {insurance.payerName}
          </Text>
        </Flex>
      </Box>

      <Separator className="absolute left-0 right-6 w-full" />
    </>
  )
  return trigger
}

export { InsuranceFormTrigger }
