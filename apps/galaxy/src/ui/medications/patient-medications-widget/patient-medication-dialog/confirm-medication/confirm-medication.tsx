'use client'

import React from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Info } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { AuthConfirmOtp } from '../auth-confirm-otp'
import { MobileConfirmOtp } from '../mobile-confirm-otp'
import { PatientMedicationSchemaType } from '../patient-medication-form'
import { IconBlock } from '../shared'
import { ConfirmationMethod, StepComponentProps } from '../types'
import { AutenticationOtp } from './autentication-otp'
import { MobileOtp } from './mobile-otp'

const ConfirmMedication = ({
  onPrev,
  onNext,
  prescriptions,
  isRefillTab,
  isRefillAndChangeRequest,
  onClose,
}: StepComponentProps) => {
  const form = useFormContext<PatientMedicationSchemaType>()
  const confirmationMethod = form.getValues('confirmationMethod')
  const controlledPrescriptionIds: string[] = []
  const prescriptionDrugIds: string[] = []
  prescriptions?.forEach((prescription) => {
    const drugs = prescription.prescriptionDrugs || prescription.drugList || []
    const controlledDrugs = drugs.filter(
      (drug) => drug?.isControlledSubstance && drug.id,
    )

    prescriptionDrugIds.push(...controlledDrugs.map((drug) => drug.id!))

    if (controlledDrugs.length && prescription.id) {
      controlledPrescriptionIds.push(prescription.id)
    }
  })

  return (
    <Flex direction="column" justify="between" className="min-h-[491px]">
      <Flex gap="3" direction="column">
        <IconBlock
          title="To submit this order, please verify your identity."
          icon={<Info size={24} className="min-w-6 text-pp-gray-3" />}
        />
        <Flex gap="2" direction="column">
          <Text size="3" weight="medium">
            Choose a verification method:
          </Text>
          <Flex gap="2">
            <AutenticationOtp />
            <MobileOtp />
          </Flex>
        </Flex>

        <MobileConfirmOtp
          onPrev={onPrev}
          onNext={onNext}
          confirmationMethod={confirmationMethod}
          prescriptionDrugIds={prescriptionDrugIds}
          controlledPrescriptionIds={controlledPrescriptionIds}
          isRefillTab={isRefillTab}
          isRefillAndChangeRequest={isRefillAndChangeRequest}
          prescriptions={prescriptions}
          onClose={onClose}
        />
      </Flex>
      {!form.watch('confirmationMethod') && (
        <Flex justify="end">
          <Button
            size="2"
            variant="outline"
            color="gray"
            type="button"
            className="text-black"
            onClick={onPrev}
          >
            Back
          </Button>
        </Flex>
      )}
    </Flex>
  )
}

export { ConfirmMedication }
