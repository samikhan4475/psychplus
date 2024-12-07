import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { PastMedicalHxWidget } from './past-medical-hx-widget'

interface PastMedicalHxWidgetLoaderProps {
  patientId: string
}

const PastMedicalHxLoader = async ({
  patientId,
}: PastMedicalHxWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <PastMedicalHxWidget patientId={patientId} initialValue={initialValue} />
  )
}

export { PastMedicalHxLoader }
