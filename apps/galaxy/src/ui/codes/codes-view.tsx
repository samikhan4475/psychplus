import { Flex } from '@radix-ui/themes'
import { CodesWidget } from './codes-widget'

interface CodesViewProps {
  patientId: string
}

const CodesView = ({ patientId }: CodesViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget patientId={patientId} />
      </Flex>
    </Flex>
  )
}

export { CodesView }
