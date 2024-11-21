import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getQuestionnairesHistories } from './api/get-questionnaires-history'
import { TmsTab } from './tms-widget'

interface TmsWidgetLoaderProps {
  patientId: string
}

const TmsWidgetLoader = async ({ patientId }: TmsWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.ProcedureTMS],
      isLatest: true,
    },
  )

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
