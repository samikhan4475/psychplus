import { Text } from '@radix-ui/themes'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { SpravatoWidget } from './spravato-widget'

interface SpravatoWidgetLoaderProps {
  patientId: string
}

const SpravatoWidgetLoader = async ({
  patientId,
}: SpravatoWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuicknoteSectionProcedureSpravato],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return <SpravatoWidget procedureSpravatoData={response.data} />
}

export { SpravatoWidgetLoader }
