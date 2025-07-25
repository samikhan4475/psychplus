'use client'

import { Flex } from '@radix-ui/themes'
import { PatientMedicationsWidget } from './patient-medications-widget'
import { Appointment } from '@/types'

interface PatientMedicationsClientLoaderProps{
appointment:Appointment
}

const PatientMedicationsClientLoader = ({appointment}:PatientMedicationsClientLoaderProps) => {
  return (
    // test comment
    <Flex direction="column" width="100%" gap="2">
      <PatientMedicationsWidget appointment={appointment}/>
    </Flex>
  )
}

export { PatientMedicationsClientLoader }
