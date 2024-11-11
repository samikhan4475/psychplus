import { Flex } from '@radix-ui/themes'
import { MseWidget } from './mse-widget'

interface MseViewProps {
  patientId: string
}

const MseView = ({ patientId }: MseViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <MseWidget patientId={patientId} isMseTab={true} />
      </Flex>
    </Flex>
  )
}

export { MseView }
