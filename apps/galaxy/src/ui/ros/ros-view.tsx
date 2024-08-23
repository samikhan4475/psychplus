import { Flex } from '@radix-ui/themes'
import { RosWidget } from './ros-widget'

interface RosViewProps {
  patientId: string
}

const RosView = ({ patientId }: RosViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <RosWidget patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { RosView }
