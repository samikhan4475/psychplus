import { AppointmentType } from '@psychplus-v2/constants'

const APPOINTMENT_TYPE_LABELS: Record<AppointmentType, string> = {
  [AppointmentType.InPerson]: 'In-Person',
  [AppointmentType.Virtual]: 'Virtual',
  [AppointmentType.Either]: 'Either',
}

const getAppointmentTypeLabel = (appointmentType: AppointmentType) => {
  return APPOINTMENT_TYPE_LABELS[appointmentType]
}

export { getAppointmentTypeLabel }
