import { Container, Flex } from '@radix-ui/themes'
import { getAppointmentDetails } from '../api'
import { cleanErrorMessage } from '../utils'
import { AppointmentsCancelled } from './appointments-cancelled'
import { AppointmentsConfirmationsFlow } from './appointments-confirmations-flow'

interface AppointmentConfirmationViewProps {
  appointmentId: string
  mapKey: string
}

const AppointmentsConfirmationsView = async ({
  appointmentId,
  mapKey,
}: AppointmentConfirmationViewProps) => {
  const appointmentResponse = await getAppointmentDetails({ appointmentId })

  return (
    <Flex direction="column" className="w-full" align="center">
      <Container className="w-full px-6 xs:w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[35%]">
        {appointmentResponse.state === 'error' ? (
          <AppointmentsCancelled
            message={cleanErrorMessage(appointmentResponse.error as string)}
          />
        ) : (
          <AppointmentsConfirmationsFlow
            data={appointmentResponse.data}
            mapKey={mapKey}
          />
        )}
      </Container>
    </Flex>
  )
}

export { AppointmentsConfirmationsView }
