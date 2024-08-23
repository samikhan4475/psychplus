import { Flex } from '@radix-ui/themes'
import { PatientReferralsWidget } from './patient-referrals-widget'

interface PatientReferralsViewProps {
  patientId: string
}

const PatientReferralsView = ({ patientId }: PatientReferralsViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientReferralsWidget patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { PatientReferralsView }
