import { Box } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { getAppointment } from '@/api'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { AlertDialog } from '../alert-dialog'
import { PsychiatryAssessmentPlanTab } from './psychiatry-assessment-plan-tab'

// TODO: Need to check if it is used anywhere in the codebase
interface PsychiatryAssessmentPlanWidgetProps {
  patientId: string
  appointmentId?: string
}

const PsychiatryAssessmentPlanWidget = async ({
  patientId,
  appointmentId,
}: PsychiatryAssessmentPlanWidgetProps) => {
  const [sectionsResponse, appointmentResult, sectionsAppointmentResponse] =
    await Promise.all([
      await getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuicknoteSectionPsychiatryAssessmentPlan,
        QuickNoteSectionName.QuicknoteSectionCodes,
      ]),
      getAppointment({
        id: appointmentId as string,
        isIncludeCodes: true,
      }),

      getQuickNoteDetailAction(
        patientId,
        [QuickNoteSectionName.QuicknoteSectionCodes],
        true,
        appointmentId,
        true,
      ),
    ])

  if (sectionsResponse.state === 'error') {
    return <Box>fail</Box>
  }
  if (appointmentResult.state === 'error') {
    return <Box>{appointmentResult.error}</Box>
  }
  if (sectionsAppointmentResponse.state === 'error') {
    return <Box>{sectionsAppointmentResponse.error}</Box>
  }

  const sectionsData = [
    ...sectionsResponse.data,
    ...sectionsAppointmentResponse.data,
  ]

  return (
    <>
      <PsychiatryAssessmentPlanTab
        appointment={appointmentResult.data}
        patientId={patientId}
        sectionsData={sectionsData}
      />
      <AlertDialog />
    </>
  )
}

export { PsychiatryAssessmentPlanWidget }
