import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { RosWidget } from './ros-widget'

interface RosWidgetProps {
  patientId: string
}

const RosWidgetLoader = async ({ patientId }: RosWidgetProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuicknoteSectionReviewOfSystem],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }
  const initialValue = transformIn(response.data)

  return <RosWidget patientId={patientId} initialValue={initialValue} />
}

export { RosWidgetLoader }
