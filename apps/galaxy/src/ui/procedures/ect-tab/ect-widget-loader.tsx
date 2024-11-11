import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { EctWidget } from './ect-widget'

interface EctWidgetLoaderProps {
  patientId: string
}

const EctWidgetLoader = async ({ patientId }: EctWidgetLoaderProps) => {
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

  return <EctWidget patientId={patientId} procedureEctData={response.data} />
}

export { EctWidgetLoader }
