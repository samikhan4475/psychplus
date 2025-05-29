'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { Prescription } from '../../types'

interface ReviewDrugWarningProps {
  drug: Prescription
}
const ReviewDrugWarning = ({ drug }: ReviewDrugWarningProps) => {
  const drugPrescription = drug?.prescriptionDrugs?.[0].isControlledSubstance
  return (
    <>
      {drugPrescription && (
        <Flex
          className="bg-pp-warning-bg-1 border-pp-warning-border mb-1 rounded-2 border p-1 px-2"
          align="start"
          gap="3"
        >
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Text size="1" weight="regular">
            This medication is classified as a controlled substance and may pose
            a risk of dependency or misuse. Advanced provider verification is
            required before prescribing or dispensing.
          </Text>
        </Flex>
      )}
    </>
  )
}

export { ReviewDrugWarning }
