import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { transformInAppointmentCodes } from '@/ui/codes/codes-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type WorkingDiagnosisDetailProps = {
  patientId: string
  appointmentId: string
  appointment?: Appointment
}

const CodesDetailsView = async ({
  patientId,
  appointmentId,
  appointment,
}: WorkingDiagnosisDetailProps) => {
  const [codesResult, appointmentCodeResult] = await Promise.all([
    getQuickNoteDetailAction(patientId, [
      QuickNoteSectionName.QuicknoteSectionCodes,
    ]),
    getQuickNoteDetailAction(
      patientId,
      [QuickNoteSectionName.QuicknoteSectionCodes],
      appointmentId,
    ),
  ])

  if (codesResult.state === 'error') {
    return <Text>{codesResult.error}</Text>
  }

  if (appointmentCodeResult.state === 'error') {
    return <Text>{appointmentCodeResult.error}</Text>
  }
  const data = transformInAppointmentCodes(
    codesResult.data,
    appointmentCodeResult.data,
  )
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionCodes}
    >
      <Details data={data} appointment={appointment} />
    </ActualNoteDetailsWrapper>
  )
}

export { CodesDetailsView }
