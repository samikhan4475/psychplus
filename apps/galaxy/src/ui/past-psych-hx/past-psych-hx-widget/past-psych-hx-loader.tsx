import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { PastPsychHxWidget } from './past-psych-hx-widget'

interface PastPsychHxWidgetLoaderProps {
  patientId: string
}

const PastPsychHxLoader = async ({
  patientId,
}: PastPsychHxWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return <PastPsychHxWidget patientId={patientId} initialValue={initialValue} />
}

export { PastPsychHxLoader }
