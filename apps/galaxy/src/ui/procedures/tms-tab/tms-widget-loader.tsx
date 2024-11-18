import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
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

  if (response.state === 'error') {
    return <div>fail</div>
  }

  return <TmsTab patientId={patientId} procedureTmsData={response.data} />
}

export { TmsWidgetLoader }
