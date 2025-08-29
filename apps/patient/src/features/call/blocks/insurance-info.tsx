'use client'

import { Flex, Text } from '@radix-ui/themes'
import { Badge } from '@/components-v2'
import {
  InsuranceChipVariantType,
  InsurancePolicy,
} from '@/features/billing/payments/types'
import { AcsInfo } from '../types'

interface InsuranceInfoProps {
  primaryPolicy?: InsurancePolicy
  acsInfo: AcsInfo
}

const InsuranceInfo = ({ primaryPolicy, acsInfo }: InsuranceInfoProps) => {
  const isActive = acsInfo?.paymentData.isPrimaryInsuranceActive

  return (
    <Flex gap="1" align="center">
      <Text className="text-[#1C2024]" size="2">
        Insurance
      </Text>
      {primaryPolicy && isActive ? (
        <>
          <Text className="text-[#1C2024]" size="2">
            - {primaryPolicy?.policyName}{' '}
          </Text>
          <Badge
            label={primaryPolicy?.verificationStatus}
            type={
              InsuranceChipVariantType[
                primaryPolicy?.verificationStatus as keyof typeof InsuranceChipVariantType
              ]
            }
            addIcon={false}
            className="w-fit"
          />
        </>
      ) : (
        <Badge
          label="Inactive"
          type="warning"
          addIcon={false}
          className="w-fit"
        />
      )}
    </Flex>
  )
}

export default InsuranceInfo
