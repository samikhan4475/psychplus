import { Flex } from '@radix-ui/themes'
import { getAppointment } from '@/api'
import { MseWidget } from './mse-widget'

interface MseViewProps {
  patientId: string
  appointmentId: string
}

const MseView = async ({ patientId, appointmentId }: MseViewProps) => {
  const appointmentResponse = await getAppointment({
    id: appointmentId,
  })

  if (appointmentResponse.state === 'error') {
    throw new Error(appointmentResponse.error)
  }

  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <MseWidget
          patientId={patientId}
          isMseTab={true}
          appointment={appointmentResponse.data}
        />
      </Flex>
    </Flex>
  )
}

export { MseView }
