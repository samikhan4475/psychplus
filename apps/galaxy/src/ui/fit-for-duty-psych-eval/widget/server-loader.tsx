import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ClientWrapper } from './client-wrapper'

interface Props {
  patientId: string
  isHeader?: boolean
}

const FitForDutyPsychEvalWidgetLoader = ({ patientId, isHeader }: Props) => {
  const promise = getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionFitForDutyPsychEval,
  ])

  return (
    <ClientWrapper
      patientId={patientId}
      promise={promise}
      isHeader={isHeader}
    />
  )
}

export { FitForDutyPsychEvalWidgetLoader }
