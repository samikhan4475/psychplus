import { getBookedAppointmentsAction } from '@/ui/schedule/actions'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type FollowUpProps = {
  patientId: string
  appointmentId: string
}

const FollowUp = async ({ patientId, appointmentId }: FollowUpProps) => {
  const response = await getBookedAppointmentsAction({
    patientIds: [Number(patientId)],
    appointmentIds: [Number(appointmentId)],
    isFollowUp: true,
  })

  if (response.state === 'error') {
    return <div>fail</div>
  }

  return (
    <ActualNoteDetailsWrapper sectionName={QuickNoteSectionName.FollowUps}>
      <Details data={response.data} />
    </ActualNoteDetailsWrapper>
  )
}

export { FollowUp }
