import { Flex } from '@radix-ui/themes'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { TherapyWidget } from './therapy-widget'

interface TherapyWidgetLoaderProps {
  patientId: string
}

const TherapyLoader = async ({ patientId }: TherapyWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionTherapy],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <Flex direction="column" width="100%">
      <TherapyWidget patientId={patientId} initialValue={initialValue} />
    </Flex>
  )
}

export { TherapyLoader }
