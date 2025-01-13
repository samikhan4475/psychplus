import { Flex } from '@radix-ui/themes'
import { PatientNotificationsView } from './patient-notifications-view/patient-notifications-view'

interface PatientNotificationsViewProps {
  patientId: string
}

const PatientNotificationsServerView = ({
  patientId,
}: PatientNotificationsViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientNotificationsView patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { PatientNotificationsServerView }
