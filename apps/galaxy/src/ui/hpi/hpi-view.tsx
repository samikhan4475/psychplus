import { Flex } from '@radix-ui/themes'
import { HpiWidget } from './hpi-widget'

interface HpiViewProps {
  patientId: string
}

const HpiView = ({ patientId }: HpiViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <HpiWidget patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { HpiView }
