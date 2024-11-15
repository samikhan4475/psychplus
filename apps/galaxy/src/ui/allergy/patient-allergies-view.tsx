import { Flex } from '@radix-ui/themes'
import { PatientAllergiesWidget } from './patient-allergies-widget'

interface PatientAllergiesViewProps {
  patientId: string
}

const PatientAllergiesView = ({ patientId }: PatientAllergiesViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientAllergiesWidget
          patientId={patientId}
          isPatientAllergiesTab={true}
        />
      </Flex>
    </Flex>
  )
}

export { PatientAllergiesView }
