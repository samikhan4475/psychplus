import {
  OTPDialog,
  ScheduleAppointmentListWidget,
} from '@psychplus/widgets/patient'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Schedule Appointment Widget'
const DESCRIPTION =
  'Displays available providers and time slots for booking an appointment.'

const ScheduleAppointmentListWidgetPage = () => (
  <>
    <Client />
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <OTPDialog />
    <ScheduleAppointmentListWidget
      providerType="Psychiatrist"
      appointmentType="Virtual"
      zipCode="77479"
    />
  </>
)

export default ScheduleAppointmentListWidgetPage
