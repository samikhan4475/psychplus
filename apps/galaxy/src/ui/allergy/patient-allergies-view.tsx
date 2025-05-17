import { Flex } from '@radix-ui/themes'
import { SCRIPTSURE_BASE_APPLICATION_URL } from '@/constants'
import { PatientAllergiesWidget } from './patient-allergies-widget'

interface PatientAllergiesViewProps {
  patientId: string
  appointmentId?: string
  isPatientAllergiesTab?: boolean
}

const PatientAllergiesView = async ({
  patientId,
  appointmentId,
  isPatientAllergiesTab,
}: PatientAllergiesViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientAllergiesWidget
          patientId={patientId}
          appointmentId={appointmentId}
          isPatientAllergiesTab={isPatientAllergiesTab}
          scriptSureAppUrl={SCRIPTSURE_BASE_APPLICATION_URL}
        />
      </Flex>
    </Flex>
  )
}

export { PatientAllergiesView }
