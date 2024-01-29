import { PATIENT_URL } from '@psychplus/utils/constants'
import { SCHEDULE_APPOINTMENT_DIALOG } from '..'
import { DialogPortal } from '../components'

const ScheduleAppointmentDialog = () => {
  return (
    <DialogPortal
      src={`${PATIENT_URL}/widgets/schedule-appointment-dialog`}
      name={SCHEDULE_APPOINTMENT_DIALOG}
    />
  )
}

export { ScheduleAppointmentDialog }
