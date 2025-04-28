import { Container, Flex } from '@radix-ui/themes'
import { BookingCancelIcon } from '@/components-v2'
import { AppointmentHeader } from '@/events/appointments/confirmations/ui/appointment-header'
import { getAppointmentRatingsStatus } from '../api'
import { PatientsAppointmentsRatings } from './patients-appointments-ratings'

interface PatientsQuestionnairesViewProps {
  appointmentId: string
}

const PatientsAppointmentsRatingsView = async ({
  appointmentId,
}: PatientsQuestionnairesViewProps) => {
  const response = await getAppointmentRatingsStatus({ appointmentId })

  return (
    <Flex direction="column" className="w-full" align="center">
      <Container className="w-full px-6 xs:w-[80%] sm:w-[60%] md:w-[50%] lg:w-[35%] xl:w-[35%]">
        {response.state === 'success' ? (
          <AppointmentHeader
            icon={<BookingCancelIcon />}
            title="Your review is already submitted"
            textClass="text-pp-gray-1"
          />
        ) : (
          <PatientsAppointmentsRatings />
        )}
      </Container>
    </Flex>
  )
}

export { PatientsAppointmentsRatingsView }
