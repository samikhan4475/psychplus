import React from 'react'
import { Flex } from '@radix-ui/themes'
import AllergiesView from './allergies/AllergiesView'
import MedicationView from './medication/MedicationView'

const AllergiesAndMedications = () => {
  return (
    <Flex direction={'column'} gap={'5'}>
      <AllergiesView />
      <MedicationView />
    </Flex>
  )
}

export { AllergiesAndMedications }
