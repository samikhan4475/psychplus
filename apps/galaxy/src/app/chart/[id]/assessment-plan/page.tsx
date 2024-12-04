import { AssessmentPlanView } from '@/ui/assessment-plan'
import { getAssessmentPlanAction } from '@/ui/assessment-plan/actions'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'

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
    tcmDataResponse,
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
    getAssessmentPlanAction({
      patientId: params.id,
      sectionName: QuickNoteSectionName.QuicknoteSectionTcm,
    }),
  ])

  if (psychiatryAssessmentPlanResponse.state === 'error') {
    return <Text>{psychiatryAssessmentPlanResponse.error}</Text>;
  }

  if (therapyAssessmentPlanResponse.state === 'error') {
    return <Text>{therapyAssessmentPlanResponse.error}</Text>;
  }
  if (familyInternalMedicineAssessmentPlanResponse.state === 'error') {
    return <Text>{familyInternalMedicineAssessmentPlanResponse.error}</Text>;

  }
  if (addOnAssessementPlanData.state === 'error') {
    return <Text>{addOnAssessementPlanData.error}</Text>;
  }
  if (tcmDataResponse.state === 'error') {
    return <Text>{tcmDataResponse.error}</Text>;
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
      tcmData={tcmDataResponse.data}
    />
  )
}

export default AssessmentPlanPage
