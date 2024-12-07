import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getQuestionnairesHistories } from './api/get-questionnaires-history'
import { TmsTab } from './tms-widget'

interface TmsWidgetLoaderProps {
  patientId: string
}

const TmsWidgetLoader = async ({ patientId }: TmsWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.ProcedureTMS,
  ])

  const questionnairesHistories = await getQuestionnairesHistories({
    patientId,
  })

  if (response.state === 'error' || questionnairesHistories.state === 'error') {
    return <div>fail</div>
  }

  return (
    <TmsTab
      patientId={patientId}
      procedureTmsData={response.data}
      questionnaireHistories={questionnairesHistories.data}
    />
  )
}

export { TmsWidgetLoader }
