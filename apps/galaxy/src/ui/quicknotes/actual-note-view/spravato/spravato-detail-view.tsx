import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { transformIn } from '@/ui/procedures/spravato-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type SpravatoDetailsProps = {
  patientId: string
  appointment?: Appointment
}

const SpravatoDetailView = async ({
  patientId,
  appointment,
}: SpravatoDetailsProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuicknoteSectionProcedureSpravato],
    true,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionProcedureSpravato}
    >
      <Details
        data={transformIn(response.data)}
        appointmentData={appointment}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { SpravatoDetailView }
