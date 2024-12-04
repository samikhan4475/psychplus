import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { TcmWidget } from './tcm-widget'
import { Text } from '@radix-ui/themes'
interface TcmWidgetLoaderProps {
  patientId: string
  isTcmTab?: boolean
}

const TcmWidgetLoader = async ({
  patientId,
  isTcmTab = false,
}: TcmWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuicknoteSectionTcm],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <TcmWidget
      patientId={patientId}
      tcmData={response.data}
      isTcmTab={isTcmTab}
    />
  )
}

export { TcmWidgetLoader }

