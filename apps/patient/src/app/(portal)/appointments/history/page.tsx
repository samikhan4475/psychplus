import AppointmentHistoryView from '@/features/appointments/history/ui/appointment-history-view'
import { Flex, Heading } from '@radix-ui/themes'

const HistoryAppointmentsPage = () => {
  return (
    <Flex direction="column" gap="3" px={"3"}>
      <Heading
        as="h2"
        weight="bold"
        className="text-[24px] text-accent-12 xs:text-[28px] sm:text-[32px]"
      >
        History
      </Heading>
      <AppointmentHistoryView />
    </Flex>
  )
}

export default HistoryAppointmentsPage
