'use client'

import React, { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useProfileStore } from '@/features/account/profile/store'
import {
  AllergyDataResponse,
  PatientMedication,
} from '@/features/medications/types'
import { useStore } from '@/features/pre-checkin-assessment/store'
import AllergiesView from './allergies/AllergiesView'
import MedicationView from './medication/MedicationView'

interface AllergiesAndMedicationsProps {
  medications: PatientMedication[]
  allergies: AllergyDataResponse[]
}

const AllergiesAndMedications: React.FC<AllergiesAndMedicationsProps> = ({
  medications,
  allergies,
}) => {
  const { isSaveButtonPressed, save } = useStore()
  const patientId = useProfileStore((state) => state.profile.id)

  useEffect(() => {
    if (isSaveButtonPressed) save({ patientId })
  }, [isSaveButtonPressed])

  return (
    <Flex direction={'column'} gap={'5'}>
      <AllergiesView allergies={allergies} />
      <MedicationView medications={medications} />
    </Flex>
  )
}

export { AllergiesAndMedications }
