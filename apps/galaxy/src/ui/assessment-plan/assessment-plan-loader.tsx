import { Text } from '@radix-ui/themes'
import { getAppointment } from '@/api'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getAssessmentPlanAction } from './actions'
import { AssessmentPlanView } from './assessment-plan-view'

interface AssessmentPlanLoaderProps {
  patientId: string
  appointmentId: string
}

const AssessmentPlanLoader = async ({
  patientId,
  appointmentId,
}: AssessmentPlanLoaderProps) => {
  const [
    appointment,
    psychiatryAssessmentPlanResponse,
    therapyAssessmentPlanResponse,
    familyInternalMedicineAssessmentPlanResponse,
    addOnAssessementPlanData,
    tcmDataResponse,
  ] = await Promise.all([
    getAppointment({ id: appointmentId }),
    getAssessmentPlanAction({
      patientId,
      sectionName:
        QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
    }),
    getAssessmentPlanAction({
      patientId,
      sectionName: QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
    }),
    getAssessmentPlanAction({
      patientId,
      sectionName:
        QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
    }),
    getAssessmentPlanAction({
      patientId,
      sectionName: QuickNoteSectionName.Addon,
    }),
    getAssessmentPlanAction({
      patientId,
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
      patientId={patientId}
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

export { AssessmentPlanLoader }
