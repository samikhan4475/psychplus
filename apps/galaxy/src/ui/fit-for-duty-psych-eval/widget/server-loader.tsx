import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { FitForDutyPsychEvalWidget } from './widget'

interface Props {
  patientId: string
  isHeader?: boolean
}

const FitForDutyPsychEvalWidgetLoader = async ({
  patientId,
  isHeader,
}: Props) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionFitForDutyPsychEval,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response?.data ?? [])

  return (
    <FitForDutyPsychEvalWidget
      patientId={patientId}
      initialValue={initialValue}
      isHeader={isHeader}
    />
  )
}

export { FitForDutyPsychEvalWidgetLoader }
