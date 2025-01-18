'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSlashedDateString } from '@psychplus-v2/utils'
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import { Badge, DeletableFieldValue, EditableFieldValue } from '@/components-v2'
import { InsurancePolicyPriority } from '@/features/billing/payments/constants'
import {
  Insurance,
  InsuranceChipVariantType,
  InsurancePayer,
} from '@/features/billing/payments/types'
import { deleteInsurance } from '../../actions'
import { InsuranceForm } from './insurance-form'

interface InsuranceFormTriggerProps {
  insurance: Insurance
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

          {
            insurance.policyHolderName?.firstName && insurance.policyHolderName?.lastName 
            ? <Text className="text-[12px] relative text-[#60646C] after:text-[32px] after-ml-[9px] after:leading-[4px] after:content-['.'] after:absolute after:top-[-1px] after:ml-[9px] last:after:hidden">
              <span className="font-medium text-[#1C2024]">
                Primary Holder Name:{' '}
              </span>{' '}
              { insurance.policyHolderName?.firstName } { insurance.policyHolderName?.lastName }
            </Text>
            
            : null
          }
          
        </Flex>
      </Box>

      {isUpdateFormTrigger && (
        <Box className="mt-3">
          <InsuranceForm
            isReadOnly={isReadOnly}
            key={insurance.id}
            insurance={insurance}
            insurancePayers={insurancePayers}
            insurancePriority={
              insurance.insurancePolicyPriority as InsurancePolicyPriority
            }
            onFormClose={toggleUpdateFormTrigger}
          />
        </Box>
      )}
    </>
  )
  return trigger
}

export { InsuranceFormTrigger }
