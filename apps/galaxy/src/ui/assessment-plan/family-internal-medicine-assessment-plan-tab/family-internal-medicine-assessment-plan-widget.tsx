import { Box } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
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
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
  ])

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
