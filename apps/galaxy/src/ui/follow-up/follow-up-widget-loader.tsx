import { Text } from '@radix-ui/themes'
import { saveWidgetAction } from '@/actions/save-widget'
import { getBookedAppointmentsAction } from '../schedule/actions'
import { transformOut } from './follow-up-widget/data'
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
  })

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  if (response.data.length > 0) {
    const selectedFollowUpIds =
      response.data.map((item) => String(item.appointmentId)) ?? []

    const payload = transformOut(
      patientId,
      appointmentId,
    )({ followUpsId: selectedFollowUpIds as string[] })

    await saveWidgetAction({ patientId, data: payload })
  }

  return (
    <QuicknotesFollowUpWidget
      patientId={patientId}
      appointmentId={appointmentId}
      initialValue={response.data}
    />
  )
}

export { FollowUpWidgetLoader }
