import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { PastPsychHxWidget } from './past-psych-hx-widget'

interface PastPsychHxWidgetLoaderProps {
  patientId: string
}

const PastPsychHxLoader = async ({
  patientId,
}: PastPsychHxWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: ['QuicknoteSectionPASTPSYCHHX'],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return <PastPsychHxWidget patientId={patientId} initialValue={initialValue} />
}

export { PastPsychHxLoader }
