import { Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { getAppointment } from '@/api'
import { AssessmentPlanView } from '@/ui/assessment-plan'
import { getAssessmentPlanAction } from '@/ui/assessment-plan/actions'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface AssessmentPlanPageProps {
  params: {
    id: string
  }
  searchParams: {
    id: string
  }
}

const AssessmentPlanPage = async ({
  params,
  searchParams,
}: AssessmentPlanPageProps) => {
  const [
    appointment,
    psychiatryAssessmentPlanResponse,
    therapyAssessmentPlanResponse,
    familyInternalMedicineAssessmentPlanResponse,
    addOnAssessementPlanData,
    tcmDataResponse,
  ] = await Promise.all([
    getAppointment(searchParams.id),
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

  if (appointment.state === 'error') {
    return <Text>{appointment.error}</Text>
  }

  if (psychiatryAssessmentPlanResponse.state === 'error') {
    return <Text>{psychiatryAssessmentPlanResponse.error}</Text>
  }

  if (therapyAssessmentPlanResponse.state === 'error') {
    return <Text>{therapyAssessmentPlanResponse.error}</Text>
  }
  if (familyInternalMedicineAssessmentPlanResponse.state === 'error') {
    return <Text>{familyInternalMedicineAssessmentPlanResponse.error}</Text>
  }
  if (addOnAssessementPlanData.state === 'error') {
    return <Text>{addOnAssessementPlanData.error}</Text>
  }
  if (tcmDataResponse.state === 'error') {
    return <Text>{tcmDataResponse.error}</Text>
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
      appointment={appointment.data}
    />
  )
}

export default AssessmentPlanPage
