import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { getPatientRelationshipsAction } from '@/ui/patient-info/patient-info-tab/actions'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
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
    patientRelationshipsResponse,
    sectionsResponse,
    codesResult,
    appointmentCodeResult,
  ] = await Promise.all([
    getAppointment({ id: appointmentId, isIncludeCodes: true }),
    getPatientRelationshipsAction(patientId),

    getQuickNoteDetailAction(patientId, [
      QuickNoteSectionName.QuicknoteSectionMse,
      QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
      QuickNoteSectionName.QuicknoteSectionTherapyAssessmentPlan,
      QuickNoteSectionName.QuicknoteSectionFamilyInternalMedicineAssessmentPlan,
      QuickNoteSectionName.Addon,
      QuickNoteSectionName.QuicknoteSectionTcm,
    ]),
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      false,
      undefined,
      true,
    ),
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      false,
      appointmentId,
      false,
    ),
  ])

  if (appointment.state === 'error') {
    return <Text>{appointment.error}</Text>
  }

  if (patientRelationshipsResponse.state === 'error') {
    return <Text>{patientRelationshipsResponse.error}</Text>
  }

  if (sectionsResponse.state === 'error') {
    return <Text>{sectionsResponse.error}</Text>
  }

  if (codesResult.state === 'error') {
    return <Text>{codesResult.error}</Text>
  }

  if (appointmentCodeResult.state === 'error') {
    return <Text>{appointmentCodeResult.error}</Text>
  }

  const sectionsData = [
    ...sectionsResponse.data,
    ...codesResult.data,
    ...appointmentCodeResult.data,
  ]

  return (
    <AssessmentPlanView
      patientId={patientId}
      appointment={appointment.data}
      patientRelationships={patientRelationshipsResponse.data}
      sectionsData={sectionsData}
    />
  )
}

export { AssessmentPlanLoader }
