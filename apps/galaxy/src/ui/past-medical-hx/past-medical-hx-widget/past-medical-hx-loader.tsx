import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { PastMedicalHxWidget } from './past-medical-hx-widget'


interface PastMedicalHxWidgetLoaderProps {
  patientId: string
}

const PastMedicalHxLoader = async ({
  patientId,
}: PastMedicalHxWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionPastMedicalHx],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return <PastMedicalHxWidget patientId={patientId} initialValue={initialValue} />
}

export { PastMedicalHxLoader }
