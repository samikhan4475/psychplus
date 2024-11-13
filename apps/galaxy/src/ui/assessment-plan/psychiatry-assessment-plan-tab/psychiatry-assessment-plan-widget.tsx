import { Box } from '@radix-ui/themes'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
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
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [
        QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
      ],
      isLatest: true,
    },
  )

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
