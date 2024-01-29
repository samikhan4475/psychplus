import { ScheduleAppointmentDialog } from '@psychplus/widgets/patient'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Schedule Appointment Dialog'
const DESCRIPTION = 'A dialog form that initiates booking a new appointment.'

const ScheduleAppointmentDialogPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <ScheduleAppointmentDialog />
    </>
  )
}

export default ScheduleAppointmentDialogPage
