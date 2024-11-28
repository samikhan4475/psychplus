import { Flex } from '@radix-ui/themes'
import { CodesWidget } from './codes-widget'

interface CodesViewProps {
  patientId: string
  isCodesHeader?: boolean
  appointmentId: string
}

const CodesView = ({
  patientId,
  appointmentId,
  isCodesHeader,
}: CodesViewProps) => {
  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget
          patientId={patientId}
          appointmentId={appointmentId}
          isCodesHeader={isCodesHeader}
        />
      </Flex>
    </Flex>
  )
}

export { CodesView }
