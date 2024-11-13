import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
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
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [
        QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
      ],
      isLatest: true,
    },
  )

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
