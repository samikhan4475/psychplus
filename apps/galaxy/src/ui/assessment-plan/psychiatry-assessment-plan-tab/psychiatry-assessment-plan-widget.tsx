import { Box } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AlertDialog } from '../alert-dialog'
import { transformIn } from './data'
import { PsychiatryAssessmentPlanTab } from './psychiatry-assessment-plan-tab'

interface PsychiatryAssessmentPlanWidgetProps {
  patientId: string
}

const PsychiatryAssessmentPlanWidget = async ({
  patientId,
}: PsychiatryAssessmentPlanWidgetProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
  ])

  if (response.state === 'error') {
    return <Box>fail</Box>
  }

  return (
    <>
      <PsychiatryAssessmentPlanTab
        patientId={patientId}
        psychiatryAssessmentPlanData={response.data}
      />
      <AlertDialog />
    </>
  )
}

export { PsychiatryAssessmentPlanWidget }
