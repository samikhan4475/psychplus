import { UpcomingAppointmentsSummary } from '@/features/appointments/upcoming'
import { Flex, Heading } from '@radix-ui/themes'

const UpcomingAppointmentsPage = () => {
  return (
    <Flex direction="column" gap="3" px={"3"}>
      <Heading
        as="h2"
        weight="bold"
        className="text-[24px] text-accent-12 xs:text-[28px] sm:text-[32px]"
      >
        Upcoming
      </Heading>
      <UpcomingAppointmentsSummary />
    </Flex>
  )
}

export default UpcomingAppointmentsPage
