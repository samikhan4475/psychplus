import { Flex } from '@radix-ui/themes'
import { FollowUpWidget } from './follow-up-widget'

interface FollowUpViewProps {
  patientId: string
}

const FollowUpView = ({ patientId }: FollowUpViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <FollowUpWidget patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { FollowUpView }
