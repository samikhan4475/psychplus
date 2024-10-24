import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { FamilyPsychHxWidget } from './family-psych-hx-widget'

interface FamilyPsychHxWidgetLoaderProps {
  patientId: string
}

const FamilyPsychHxLoader = async ({
  patientId,
}: FamilyPsychHxWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionFamilyPsychHx],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <FamilyPsychHxWidget patientId={patientId} initialValue={initialValue} />
  )
}

export { FamilyPsychHxLoader }
