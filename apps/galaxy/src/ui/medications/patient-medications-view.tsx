import { Flex } from '@radix-ui/themes'
import { SCRIPTSURE_BASE_APPLICATION_URL } from '@/constants'
import { PatientMedicationsWidget } from './patient-medications-widget'

interface PatientMedicationsViewProps {
  patientId: string
}

const PatientMedicationsView = ({ patientId }: PatientMedicationsViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientMedicationsWidget
          patientId={patientId}
          scriptSureAppUrl={SCRIPTSURE_BASE_APPLICATION_URL}
        />
      </Flex>
    </Flex>
  )
}

export { PatientMedicationsView }
