import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { transformIn } from './data'
import { PhysicalExamWidget } from './physical-exam-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  appointment?: Appointment
  isPhysicalExamTab?: boolean
}

const PhysicalExamWidgetLoader = async ({
  patientId,
  appointment,
  isPhysicalExamTab = false,
}: HpiWidgetLoaderProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionPhysicalExam,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  const initialValue = transformIn(response.data)

  return (
    <PhysicalExamWidget
      patientId={patientId}
      initialValue={initialValue}
      isPhysicalExamTab={isPhysicalExamTab}
      appointment={appointment}
    />
  )
}

export { PhysicalExamWidgetLoader }
