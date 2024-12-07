import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { RosWidget } from './ros-widget'

interface RosWidgetProps {
  patientId: string
}

const RosWidgetLoader = async ({ patientId }: RosWidgetProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionReviewOfSystem,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }
  const initialValue = transformIn(response.data)

  return <RosWidget patientId={patientId} initialValue={initialValue} />
}

export { RosWidgetLoader }
