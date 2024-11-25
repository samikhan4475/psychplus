import { Box } from '@radix-ui/themes'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { MseWidget } from './mse-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  isMseTab?: boolean
}

const MseWidgetLoader = async ({
  patientId,
  isMseTab = false,
}: HpiWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: ['QuicknoteSectionMse'],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <Box>fail</Box>
  }

  const initialValue = transformIn(response.data)

  return (
    <MseWidget
      patientId={patientId}
      initialValue={initialValue}
      isMseTab={isMseTab}
    />
  )
}

export { MseWidgetLoader }
