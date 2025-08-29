'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSlashedDateString } from '@psychplus-v2/utils'
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { Badge, DeletableFieldValue, EditableFieldValue } from '@/components-v2'
import {
  InsuranceChipVariantType,
  InsurancePayer,
  InsurancePolicy,
} from '@/features/billing/payments/types'
import { deleteInsurance } from '../../actions'
import { InsuranceForm } from './insurance-form'

interface InsuranceFormTriggerProps {
  insurance: InsurancePolicy
  insurancePayers: InsurancePayer[]
  isReadOnly?: boolean
}
const InsuranceFormTrigger = ({
  insurance,
  insurancePayers,
  isReadOnly = false,
}: InsuranceFormTriggerProps) => {
  const getStatusVariant = (
    variantType: keyof typeof InsuranceChipVariantType,
  ): string => {
    return InsuranceChipVariantType[variantType] || 'basic'
  }

  const router = useRouter()
  const onDeleteAction = () => deleteInsurance({ id: insurance?.id })

  const [isUpdateFormTrigger, setIsUpdateFormTrigger] = useState(false)

  const toggleUpdateFormTrigger = () => setIsUpdateFormTrigger((prev) => !prev)

  const trigger = (
    <>
      <Box>
        <Flex
          align="center"
          justify="between"
          className="mb-3 flex-col gap-1 md:flex-row"
          width="100%"
        >
          <Flex align="center" gap="2">
            <Heading weight="medium" size="4" className="font-sans text-[18px]">
              {insurance.payerName}
            </Heading>

            <Text
              className={`rounded-[12px] border px-2 py-[2px] text-[12px] font-medium ${getPolicyStyles(
                insurance.insurancePolicyPriority,
              )}`}
            >
              {insurance.insurancePolicyPriority.toLocaleUpperCase()}
            </Text>
          </Flex>

          <Flex align="center" gap="3">
            <Box onClick={toggleUpdateFormTrigger}>
              <EditableFieldValue />
            </Box>
            <Separator orientation="vertical" />
            <DeletableFieldValue
              tooltip="Remove this insurance"
              deleteAction={onDeleteAction}
              onSuccess={router.refresh}
              confirmTitle="Remove Insurance"
              confirmDescription="Are you sure you want to remove this insurance?"
              confirmActionLabel="Remove insurance"
              toastTitle="Insurance Removed"
            />
          </Flex>
        </Flex>

        <Flex
          align="center"
          gap="1"
          className="mb-2"
          wrap={{ initial: 'wrap', md: 'nowrap' }}
        >
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
          <Text className="after-ml-[9px] relative text-[12px] text-[#60646C] after:absolute after:top-[-1px] after:ml-[9px] after:text-[32px] after:leading-[4px] after:content-['.'] last:after:hidden">
            <Text className="font-medium text-[#1C2024]">Effective Date: </Text>
            {getSlashedDateString(insurance.effectiveDate)}
          </Text>

          <Text className="after-ml-[9px] relative text-[12px] text-[#60646C] after:absolute after:top-[-1px] after:ml-[9px] after:text-[32px] after:leading-[4px] after:content-['.'] last:after:hidden">
            <Text className="font-medium text-[#1C2024]">Term Date: </Text>
            {getSlashedDateString(insurance.terminationDate)}
          </Text>

          {insurance.policyHolderName?.firstName &&
          insurance.policyHolderName?.lastName ? (
            <Text className="after-ml-[9px] relative text-[12px] text-[#60646C] after:absolute after:top-[-1px] after:ml-[9px] after:text-[32px] after:leading-[4px] after:content-['.'] last:after:hidden">
              <Text size="1" className="font-medium text-[#1C2024]">
                Primary Holder Name:{' '}
              </Text>{' '}
              {insurance.policyHolderName?.firstName}{' '}
              {insurance.policyHolderName?.lastName}
            </Text>
          ) : null}
          {insurance.policyHolderRelationship && (
            <Text className="after-ml-[9px] relative text-[12px] text-[#60646C] after:absolute after:top-[-1px] after:ml-[9px] after:text-[32px] after:leading-[4px] after:content-['.'] last:after:hidden">
              <Text className="font-medium text-[#1C2024]">Relationship: </Text>
              {insurance.policyHolderRelationship}
            </Text>
          )}
        </Flex>
      </Box>

      {isUpdateFormTrigger && (
        <Box className="mt-3">
          <InsuranceForm
            isReadOnly={isReadOnly}
            key={insurance.id}
            insurance={insurance}
            insurancePayers={insurancePayers}
            onFormClose={toggleUpdateFormTrigger}
            formHeading="Edit Insurance"
          />
        </Box>
      )}
    </>
  )
  return trigger
}

const getPolicyStyles = (policyPriority: string) => {
  switch (policyPriority) {
    case 'Primary':
      return 'border-[#0C7792] bg-[#E7F9FB] text-[#0C7792]'
    case 'Secondary':
      return 'border-[#5746AF] bg-[#F5F2FF] text-[#5746AF]'
    default:
      return 'border-[#60646C] bg-[#EBEBEF] text-[#60646C]'
  }
}

export { InsuranceFormTrigger }
