import { Box } from '@radix-ui/themes'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AlertDialog } from '../alert-dialog'
import { transformIn } from './data'
import { FamilyInternalMedicineAssessmentPlanTab } from './family-internal-medicine-assessment-plan-tab'

interface FamilyInternalMedicineAssessmentPlanWidgetProps {
  patientId: string
}

const FamilyInternalMedicineAssessmentPlanWidget = async ({
  patientId,
}: FamilyInternalMedicineAssessmentPlanWidgetProps) => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [
        QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
      ],
      isLatest: true,
    },
  )

  if (response.state === 'error') {
    return <Box>fail</Box>
  }

  return (
    <>
      <FamilyInternalMedicineAssessmentPlanTab
        patientId={patientId}
        familyInternalMedicineAssessmentPlanData={response.data}
      />
      <AlertDialog />
    </>
  )
}

export { FamilyInternalMedicineAssessmentPlanWidget }
