'use client'

import React, { useEffect, useState } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { getPatientProfileAction } from '@/actions'
import { PatientProfile } from '@/types'
import { StepComponentProps } from '../types'
import { ReviewDrugAccordian } from './review-drug-accordian'
import { ReviewPatientInformation } from './review-patient-information'
import { ReviewPharmacyInformation } from './review-pharmacy-information'

const ReviewPrescription = ({
  onTransmit,
  onPrev,
  prescriptions,
  isTransmiting,
}: StepComponentProps) => {
  const [patientProfile, setPatientProfile] = useState<
    PatientProfile | undefined
  >(undefined)
  const [loading, setLoading] = useState(false)
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
      </Flex>
      <Flex justify="end" gap="2" mt="3">
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
        <Button
          size="2"
          type="button"
          highContrast
          loading={isTransmiting}
          onClick={() => onTransmit?.()}
        >
          Transmit
        </Button>
      </Flex>
    </Flex>
  )
}

export { ReviewPrescription }
