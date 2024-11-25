import { Flex } from '@radix-ui/themes'
import { HpiWidget } from './hpi-widget'

interface HpiViewProps {
  patientId: string
  isHpiHeader?: boolean
}

const HpiView = ({ patientId, isHpiHeader }: HpiViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <HpiWidget patientId={patientId} isHpiHeader={isHpiHeader} />
      </Flex>
    </Flex>
  )
}

export { HpiView }
