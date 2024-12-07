import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { FamilyPsychHxWidget } from './family-psych-hx-widget'

interface FamilyPsychHxWidgetLoaderProps {
  patientId: string
}

const FamilyPsychHxLoader = async ({
  patientId,
}: FamilyPsychHxWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <FamilyPsychHxWidget patientId={patientId} initialValue={initialValue} />
  )
}

export { FamilyPsychHxLoader }
