import React from 'react'
import { useRouter } from 'next/navigation'
import { cn, getSlashedDateString } from '@psychplus-v2/utils'
import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'
import {
  Badge,
  DeletableFieldValue,
  EditableFieldValue,
  EmptyFileIcon,
  FeatureEmpty,
} from '@/components-v2'
import { deleteInsurance } from '@/features/billing/payments/actions'
import {
  Insurance,
  InsuranceChipVariantType,
} from '@/features/billing/payments/types'

const InsuranceList = ({
  patientInsurance,
  onAddInsuranceClick,
  setInsurance,
}: {
  patientInsurance: Insurance[]
  onAddInsuranceClick: (value: string) => void
  setInsurance: (insurance: Insurance | undefined) => void
}) => {
  const getStatusVariant = (
    variantType: keyof typeof InsuranceChipVariantType,
  ): string => {
    return InsuranceChipVariantType[variantType] || 'basic'
  }

  const router = useRouter()
  const onDeleteAction = (id: string) => deleteInsurance({ id: id })

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

  return (
    <Flex direction="column" gap="2">
      {patientInsurance.length > 0 ? (
        <Flex direction="column" gap="2">
          {patientInsurance.map((insurance) => (
            <Flex className="w-full" direction="column" key={insurance.id}>
              <Box>
                <Flex
                  align="center"
                  justify="between"
                  className="mb-3"
                  width="100%"
                >
                  <Flex align="center" gap="2">
                    <Heading
                      weight="medium"
                      size="4"
                      className="font-sans text-[18px]"
                    >
                      {insurance.payerName}
                    </Heading>

                    <Text
                      className={`rounded-[12px] border px-2 py-[2px] text-[12px] font-medium ${getPolicyStyles(
                        insurance.insurancePolicyPriority,
                      )}`}
                    >
                      {insurance.insurancePolicyPriority}
                    </Text>
                  </Flex>

                  <Flex align="center" gap="3">
                    <Box
                      onClick={() => {
                        setInsurance(insurance)
                        onAddInsuranceClick('add-insurance')
                      }}
                    >
                      <EditableFieldValue />
                    </Box>
                    <Separator orientation="vertical" />
                    <DeletableFieldValue
                      tooltip="Remove this insurance"
                      deleteAction={() => onDeleteAction(insurance.id)}
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

                  <Badge
                    label={`Member ID: ${insurance.memberId}`}
                    type="basic"
                  />

                  <Badge
                    label={`Group ID: ${insurance.groupNumber}`}
                    type="basic"
                  />
                </Flex>

                <Flex align="center" gap="5">
                  <Text className="after-ml-[9px] relative text-[12px] text-[#60646C] after:absolute after:top-[-1px] after:ml-[9px] after:text-[32px] after:leading-[4px] after:content-['.'] last:after:hidden">
                    <span className="font-medium text-[#1C2024]">
                      Effective Date:{' '}
                    </span>
                    {getSlashedDateString(insurance.effectiveDate)}
                  </Text>

                  <Text className="after-ml-[9px] relative text-[12px] text-[#60646C] after:absolute after:top-[-1px] after:ml-[9px] after:text-[32px] after:leading-[4px] after:content-['.'] last:after:hidden">
                    <span className="font-medium text-[#1C2024]">
                      Term Date:{' '}
                    </span>{' '}
                    {getSlashedDateString(insurance.terminationDate)}
                  </Text>

                  {insurance.policyHolderName?.firstName &&
                  insurance.policyHolderName?.lastName ? (
                    <Text className="after-ml-[9px] relative text-[12px] text-[#60646C] after:absolute after:top-[-1px] after:ml-[9px] after:text-[32px] after:leading-[4px] after:content-['.'] last:after:hidden">
                      <span className="font-medium text-[#1C2024]">
                        Primary Holder Name:{' '}
                      </span>{' '}
                      {insurance.policyHolderName?.firstName}{' '}
                      {insurance.policyHolderName?.lastName}
                    </Text>
                  ) : null}
                </Flex>
              </Box>
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
      <Flex
        width="100%"
        justify={patientInsurance.length < 1 ? 'center' : 'start'}
        className={cn({
          '-mt-12': patientInsurance.length < 1,
        })}
      >
        <Text
          weight="medium"
          className="mt-[2px] flex cursor-pointer items-center rounded-6 border px-3 py-2 text-[15px] text-[#194595]"
          onClick={() => onAddInsuranceClick('add-insurance')}
        >
          + Add New Insurance
        </Text>
      </Flex>
    </Flex>
  )
}

export default InsuranceList
