import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { HospitalInitialWidget } from './hospital-initial-widget'

interface HospitalInitialWidgetLoaderProps {
  patientId: string
  isHospitalInitialTab?: boolean
}

const HospitalInitialWidgetLoader = async ({
  patientId,
  isHospitalInitialTab = false,
}: HospitalInitialWidgetLoaderProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionHospitalInitial],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <HospitalInitialWidget
      patientId={patientId}
      initialValue={initialValue}
      isHospitalInitialTab={isHospitalInitialTab}
    />
  )
}

export { HospitalInitialWidgetLoader }
