import { AssessmentPlanView } from '@/ui/assessment-plan'
import { getAssessmentPlanAction } from '@/ui/assessment-plan/actions'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface AssessmentPlanPageProps {
  params: {
    id: string
  }
}

const AssessmentPlanPage = async ({ params }: AssessmentPlanPageProps) => {
  const [
    psychiatryAssessmentPlanResponse,
    therapyAssessmentPlanResponse,
    familyInternalMedicineAssessmentPlanResponse,
    addOnAssessementPlanData,
  ] = await Promise.all([
    getAssessmentPlanAction({
      patientId: params.id,
      sectionName:
        QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    }),
    getAssessmentPlanAction({
      patientId: params.id,
      sectionName: QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
    }),
    getAssessmentPlanAction({
      patientId: params.id,
      sectionName:
        QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    }),
    getAssessmentPlanAction({
      patientId: params.id,
      sectionName: QuickNoteSectionName.Addon,
    }),
  ])

  if (psychiatryAssessmentPlanResponse.state === 'error') {
    throw new Error(psychiatryAssessmentPlanResponse.error)
  }

  if (therapyAssessmentPlanResponse.state === 'error') {
    throw new Error(therapyAssessmentPlanResponse.error)
  }
  if (familyInternalMedicineAssessmentPlanResponse.state === 'error') {
    throw new Error(familyInternalMedicineAssessmentPlanResponse.error)
  }
  if (addOnAssessementPlanData.state === 'error') {
    throw new Error(addOnAssessementPlanData.error)
  }

  return (
    <AssessmentPlanView
      patientId={params.id}
      psychiatryAssessmentPlanData={psychiatryAssessmentPlanResponse.data}
      therapyAssessmentPlanData={therapyAssessmentPlanResponse.data}
      familyInternalMedicineAssessmentPlanData={
        familyInternalMedicineAssessmentPlanResponse.data
      }
      addOnAssessementPlanData={addOnAssessementPlanData.data}
    />
  )
}

export default AssessmentPlanPage
