import { Flex } from '@radix-ui/themes'
import { CodesWidget } from './codes-widget'

interface CodesViewProps {
  patientId: string
  isCodesHeader?: boolean
}

const CodesView = ({ patientId, isCodesHeader }: CodesViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget patientId={patientId} isCodesHeader={isCodesHeader} />
      </Flex>
    </Flex>
  )
}

export { CodesView }
