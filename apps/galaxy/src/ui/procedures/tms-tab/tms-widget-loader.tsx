import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getQuestionnairesHistories } from './api/get-questionnaires-history'
import { TmsTab } from './tms-widget'

interface TmsWidgetLoaderProps {
  patientId: string
  appointmentId?: string
}

const TmsWidgetLoader = async ({
  patientId,
  appointmentId,
}: TmsWidgetLoaderProps) => {
  const [response, questionnairesHistories, appointmentResult] =
    await Promise.all([
      getQuickNoteDetailAction(patientId, [QuickNoteSectionName.ProcedureTMS]),
      getQuestionnairesHistories({ patientId }),
      getAppointment(appointmentId as string),
    ])

  if (response.state === 'error') {
    return <div>{response.error}</div>
  }

  if (questionnairesHistories.state === 'error') {
    return <div>{questionnairesHistories.error}</div>
  }

  if (appointmentResult.state === 'error') {
    return <div>{appointmentResult.error}</div>
  }

  return (
    <TmsTab
      patientId={patientId}
      procedureTmsData={response.data}
      questionnaireHistories={questionnairesHistories.data}
      appointmentData={appointmentResult.data}
    />
  )
}

export { TmsWidgetLoader }
