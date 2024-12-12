import { Flex } from '@radix-ui/themes'
import { PatientReferralsWidget } from './patient-referrals-widget'

interface PatientReferralsViewProps {
  patientId: string
  isTabView?: boolean
}

const PatientReferralsView = ({
  patientId,
  isTabView,
}: PatientReferralsViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <PatientReferralsWidget patientId={patientId} isTabView={isTabView} />
      </Flex>
    </Flex>
  )
}

export { PatientReferralsView }
