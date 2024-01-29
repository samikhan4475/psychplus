import { PATIENT_URL } from '@psychplus/utils/constants'
import { createSearchParams } from '@psychplus/utils/url'
import { SCHEDULE_APPOINTMENT_LIST } from '..'
import { WidgetPortal } from '../components'

interface Props {
  providerType?: string
  appointmentType?: string
  zipCode?: string
}

const ScheduleAppointmentListWidget = (props: Props) => {
  const searchParams = createSearchParams({
    providerType: props.providerType,
    appointmentType: props.appointmentType,
    zipCode: props.zipCode,
  })

  return (
    <WidgetPortal
      src={`${PATIENT_URL}/widgets/schedule-appointment-list?${searchParams.toString()}`}
      name={SCHEDULE_APPOINTMENT_LIST}
    />
  )
}

export { ScheduleAppointmentListWidget }
