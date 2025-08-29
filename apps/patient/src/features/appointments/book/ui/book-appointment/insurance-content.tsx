'use client'

import { EmptyFileIcon, FeatureEmpty, TriggerButton } from '@/components-v2'
import { InsurancePayer, InsurancePolicy } from '@/features/billing/payments/types'
import { InsuranceFormTrigger } from '@/features/billing/payments/ui/insurance-card/Insurance-form-trigger'
import { VerificationStatus } from '@/types'
import { Box, Flex } from '@radix-ui/themes'

const InsuranceContent = ({
  patientInsurances,
  insurancePayers,
  setInsuranceOpenStateValue,
}: {
  patientInsurances: InsurancePolicy[]
  insurancePayers: InsurancePayer[]
  setInsuranceOpenStateValue: (value: string) => void
}) => {
  if (!patientInsurances) {
    return (
      <>
        <FeatureEmpty
          description="No insurance added yet"
          Icon={EmptyFileIcon}
        />
        <Flex
          width="100%"
          justify="center"
          className="-mt-10 mb-8"
          onClick={() => setInsuranceOpenStateValue('Add/Edit Insurance')}
        >
          <TriggerButton title="Add New Insurance" />
        </Flex>
      </>
    )
  }

  return (
    <Flex width="100%" gap={{ initial: '2', md: '3' }} direction="column">
      {patientInsurances.map((insurance) => (
        <Flex
          key={insurance.id}
          p={{ initial: '2', md: '3' }}
          className="w-full rounded-2 border border-[#DDDDE3]"
        >
          <Box className="w-full">
            <InsuranceFormTrigger
              isReadOnly={
                insurance.verificationStatus === VerificationStatus.Verified
              }
              insurance={insurance}
              insurancePayers={insurancePayers}
            />
          </Box>
        </Flex>
      ))}
    </Flex>
  )
}

export default InsuranceContent
