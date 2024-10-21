import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { PhysicalExamWidget } from './physical-exam-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  isPhysicalExamTab?: boolean
}

const PhysicalExamWidgetLoader = async ({
  patientId,
  isPhysicalExamTab = false,
}: HpiWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: ['QuicknoteSectionPhysicalExam'],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <PhysicalExamWidget
      patientId={patientId}
      initialValue={initialValue}
      isPhysicalExamTab={isPhysicalExamTab}
    />
  )
}

export { PhysicalExamWidgetLoader }
