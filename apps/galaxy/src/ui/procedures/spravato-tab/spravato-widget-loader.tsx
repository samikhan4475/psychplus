import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { SpravatoWidget } from './spravato-widget'

interface SpravatoWidgetLoaderProps {
  patientId: string
  appointmentId?: string
}

const SpravatoWidgetLoader = async ({
  patientId,
  appointmentId,
}: SpravatoWidgetLoaderProps) => {
  const [response, appointmentResult] = await Promise.all([
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionProcedureSpravato],
      false,
      appointmentId,
    ),
    getAppointment({ id: appointmentId as string }),
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  if (appointmentResult.state === 'error') {
    return <Text>{appointmentResult.error}</Text>
  }

  return (
    <SpravatoWidget
      procedureSpravatoData={response.data}
      appointmentData={appointmentResult.data}
    />
  )
}

export { SpravatoWidgetLoader }
