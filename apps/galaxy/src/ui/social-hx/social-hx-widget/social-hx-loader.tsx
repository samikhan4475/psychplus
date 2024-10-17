import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { SocialHxWidget } from './social-hx-widget'

interface SocialHxWidgetLoaderProps {
  patientId: string
}

const SocialHxLoader = async ({ patientId }: SocialHxWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionSocialHx],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return <SocialHxWidget patientId={patientId} initialValue={initialValue} />
}

export { SocialHxLoader }
