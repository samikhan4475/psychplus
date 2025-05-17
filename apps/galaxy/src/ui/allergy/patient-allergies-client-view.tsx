'use client'

import { Flex } from '@radix-ui/themes'
import { useStore } from '@/store'
import { PatientAllergiesWidget } from './patient-allergies-widget'

interface PatientAllergiesViewProps {
  patientId: string
  appointmentId?: string
  isPatientAllergiesTab?: boolean
}

const PatientAllergiesClientView = ({
  patientId,
  isPatientAllergiesTab,
  appointmentId,
}: PatientAllergiesViewProps) => {
  const { constant } = useStore((state) => ({
    constant: state.constants,
  }))

  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientAllergiesWidget
          patientId={patientId}
          appointmentId={appointmentId}
          isPatientAllergiesTab={isPatientAllergiesTab}
          scriptSureAppUrl={constant.scriptsureBaseApplicationUrl}
        />
      </Flex>
    </Flex>
  )
}

export { PatientAllergiesClientView }
