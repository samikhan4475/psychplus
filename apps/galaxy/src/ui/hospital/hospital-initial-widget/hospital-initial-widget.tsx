import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HospitalInitialTab } from './hospital-initial-tab'

interface HospitalInitialWidgetLoaderProps {
  patientId: string
  isHospitalInitialTab?: boolean
}

const HospitalInitialWidget = async ({
  patientId,
  isHospitalInitialTab = false,
}: HospitalInitialWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionHospitalInitial,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  return (
    <HospitalInitialTab
      patientId={patientId}
      isHospitalInitialTab={isHospitalInitialTab}
      hospitalInitialData={response.data}
    />
  )
}

export { HospitalInitialWidget }
