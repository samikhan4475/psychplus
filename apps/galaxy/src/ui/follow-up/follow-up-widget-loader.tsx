import { Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '../schedule/actions'
import { QuicknotesFollowUpWidget } from './quicknotes-follow-up-widget'

interface FollowUpWidgetLoaderProps {
  patientId: string
  appointmentId?: string
}

const FollowUpWidgetLoader = async ({
  patientId,
  appointmentId,
}: FollowUpWidgetLoaderProps) => {
  if (!appointmentId) return

  const response = await getBookedAppointmentsAction({
    patientIds: [Number(patientId)],
    appointmentIds: [Number(appointmentId)],
    isFollowUp: true,
    isShowActiveVisits: true,
  })

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <QuicknotesFollowUpWidget
      patientId={patientId}
      appointment={{} as Appointment}
      appointmentId={appointmentId}
      initialValue={response.data}
    />
  )
}

export { FollowUpWidgetLoader }
