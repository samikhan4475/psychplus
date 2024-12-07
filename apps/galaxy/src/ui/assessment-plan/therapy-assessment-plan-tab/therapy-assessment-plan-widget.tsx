import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AlertDialog } from '../alert-dialog'
import { transformIn } from './data'
import { TherapyAssessmentPlanTab } from './therapy-assessment-plan-tab'

interface TherapyAssessmentPlanWidgetProps {
  patientId: string
}

const TherapyAssessmentPlanWidget = async ({
  patientId,
}: TherapyAssessmentPlanWidgetProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
  ])

  if (response.state === 'error') {
    return <div>fail</div>
  }

  return (
    <>
      <TherapyAssessmentPlanTab
        patientId={patientId}
        therapyAssessmentPlanData={response.data}
      />
      <AlertDialog />
    </>
  )
}

export { TherapyAssessmentPlanWidget }
