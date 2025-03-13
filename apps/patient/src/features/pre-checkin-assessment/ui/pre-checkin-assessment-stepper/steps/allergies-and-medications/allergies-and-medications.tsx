import React from 'react'
import { Flex } from '@radix-ui/themes'
import {
  AllergyDataResponse,
  PatientMedication,
} from '@/features/medications/types'
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
  return (
    <Flex direction={'column'} gap={'5'}>
      <AllergiesView allergies={allergies} />
      <MedicationView medications={medications} />
    </Flex>
  )
}

export { AllergiesAndMedications }
