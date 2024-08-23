import { Flex } from '@radix-ui/themes'
import { PatientMedicationsWidget } from './patient-medications-widget'

interface PatientMedicationsViewProps {
  patientId: string
}

const PatientMedicationsView = ({ patientId }: PatientMedicationsViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientMedicationsWidget patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { PatientMedicationsView }
