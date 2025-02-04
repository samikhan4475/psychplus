'use client'

import { Flex } from '@radix-ui/themes'
import { PatientAllergiesWidget } from './patient-allergies-widget'
import { useStore } from '@/store'

interface PatientAllergiesViewProps {
  patientId: string
  isPatientAllergiesTab?: boolean
}

const PatientAllergiesClientView = ({
  patientId,
  isPatientAllergiesTab,
}: PatientAllergiesViewProps) => {
  const { constant } = useStore((state) => ({
    constant: state.constants,
  }))
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientAllergiesWidget
          patientId={patientId}
          isPatientAllergiesTab={isPatientAllergiesTab}
          scriptSureAppUrl={constant.scriptsureBaseApplicationUrl}
        />
      </Flex>
    </Flex>
  )
}

export { PatientAllergiesClientView }
