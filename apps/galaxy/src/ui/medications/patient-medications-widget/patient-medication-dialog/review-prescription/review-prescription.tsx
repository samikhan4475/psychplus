'use client'

import React, { useEffect, useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { getPatientProfileAction } from '@/actions'
import { useHasPermission } from '@/hooks'
import { PatientProfile } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { useStore } from '../../store'
import { Step, StepComponentProps } from '../types'
import { ReviewDrugAccordian } from './review-drug-accordian'
import { ReviewDrugMessage } from './review-drug-message'
import { ReviewPatientInformation } from './review-patient-information'
import { ReviewPharmacyInformation } from './review-pharmacy-information'

const DEFAULT_ALERT_MESSAGE =
  'You do not have permission to Transmit. Please contact your supervisor if you need any further assistance.'

const ReviewPrescription = ({
  onTransmit,
  onPrev,
  prescriptions,
  isTransmiting,
  intialStep,
}: StepComponentProps) => {
  const [patientProfile, setPatientProfile] = useState<
    PatientProfile | undefined
  >(undefined)
  const [loading, setLoading] = useState(false)
  const { hasControlledMedication } = useStore((state) => ({
    hasControlledMedication: state.hasControlledMedication,
  }))
  const transmitmedication = useHasPermission('transmitmedication')
  const [openAlert, setOpenAlert] = useState(false)
  const signMedication = useHasPermission('signMedication')
  useEffect(() => {
    if (!prescriptions || prescriptions.length === 0) return

    const fetchPatientProfile = async () => {
      setLoading(true)
      try {
        const patientId = String(prescriptions[0]?.patientId)
        const res = await getPatientProfileAction(patientId)
        if (res.state === 'success') {
          setPatientProfile(res.data)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPatientProfile()
  }, [prescriptions])
  const showBackButton =
    intialStep !== Step.Review &&
    (!hasControlledMedication || (hasControlledMedication && signMedication))
  const isTransmitDisabled = !hasControlledMedication && !transmitmedication

  const handleTransmitClick = () => {
    if (isTransmitDisabled) {
      setOpenAlert(true)
      return
    }

    onTransmit?.()
  }
  return (
    <Flex direction="column" justify="between" className="min-h-[491px]">
      <Flex direction="column" gap="3">
        <ReviewPatientInformation
          patientProfile={patientProfile}
          loading={loading}
          prescriptions={prescriptions}
        />
        <ReviewPharmacyInformation prescriptions={prescriptions} />
        <ReviewDrugAccordian prescriptions={prescriptions} />
        <ReviewDrugMessage
          type="warning"
          description="By completing the two-factor authentication protocol at this time, you are legally signing the prescription(s) and authorizing the transmission of the above information to the pharmacy for dispensing."
        />
      </Flex>
      <Flex justify="end" gap="2" mt="3">
        {showBackButton && (
          <Button
            size="2"
            variant="outline"
            color="gray"
            type="button"
            className="text-black"
            onClick={onPrev}
            disabled={isTransmiting}
          >
            Back
          </Button>
        )}

        <Button
          size="2"
          type="button"
          highContrast
          loading={isTransmiting}
          onClick={handleTransmitClick}
        >
          {hasControlledMedication ? 'Sign' : 'Transmit'}
        </Button>
      </Flex>
      <PermissionAlert
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        message={DEFAULT_ALERT_MESSAGE}
      />
    </Flex>
  )
}

export { ReviewPrescription }
