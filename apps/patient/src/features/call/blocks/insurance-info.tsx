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
  isUnAuthenticated?: boolean
}

const InsuranceInfo = ({
  primaryPolicy,
  acsInfo,
  isUnAuthenticated = false,
}: InsuranceInfoProps) => {
  const isActive = acsInfo?.paymentData?.isPrimaryInsuranceActive

  const renderUnauthenticatedView = () => {
    if (!isActive) return null

    return (
      <Badge
        label="Verified"
        type="success"
        addIcon={false}
        className="w-fit"
      />
    )
  }

  const renderAuthenticatedView = () => {
    if (primaryPolicy && isActive) {
      const verificationStatus = primaryPolicy.verificationStatus
      const badgeType =
        InsuranceChipVariantType[
          verificationStatus as keyof typeof InsuranceChipVariantType
        ]

      return (
        <>
          <Text className="text-[#1C2024]" size="2">
            - {primaryPolicy.policyName}
          </Text>
          <Badge
            label={verificationStatus}
            type={badgeType}
            addIcon={false}
            className="w-fit"
          />
        </>
      )
    }

    return (
      <Badge
        label="Inactive"
        type="warning"
        addIcon={false}
        className="w-fit"
      />
    )
  }

  return (
    <Flex gap="1" align="center">
      <Text className="text-[#1C2024]" size="2">
        Insurance
      </Text>
      {isUnAuthenticated
        ? renderUnauthenticatedView()
        : renderAuthenticatedView()}
    </Flex>
  )
}

export default InsuranceInfo
