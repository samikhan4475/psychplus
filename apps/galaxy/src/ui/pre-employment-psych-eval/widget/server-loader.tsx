import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { PreEmploymentClientWrapper } from './client-wrapper'

interface Props {
  patientId: string
  isHeader?: boolean
}

const PreEmploymentEvalWidgetLoader = ({ patientId, isHeader }: Props) => {
  const promise = getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionPreEmployment,
  ])

  return (
    <PreEmploymentClientWrapper
      patientId={patientId}
      promise={promise}
      isHeader={isHeader}
    />
  )
}

export { PreEmploymentEvalWidgetLoader }
