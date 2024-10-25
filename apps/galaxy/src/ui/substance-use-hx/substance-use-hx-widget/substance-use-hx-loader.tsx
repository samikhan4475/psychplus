import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { SubstanceUseHxWidget } from './substance-use-widget'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface SubstanceUseHxWidgetLoaderProps {
  patientId: string
}

const SubstanceUseHxLoader = async ({
  patientId,
}: SubstanceUseHxWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionSubstanceUseHx],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return <SubstanceUseHxWidget patientId={patientId} initialValue={initialValue} />
}

export { SubstanceUseHxLoader }
