import { Flex } from '@radix-ui/themes'
import { VitalsWidget } from './vitals-widget'

interface VitalsViewProps {
  patientId: string
}

const VitalsView = ({ patientId }: VitalsViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2" className="bg-[white]">
        <VitalsWidget patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { VitalsView }
