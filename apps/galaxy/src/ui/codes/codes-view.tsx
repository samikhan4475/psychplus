import { unstable_noStore as noStore } from 'next/cache'
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
  noStore()
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
