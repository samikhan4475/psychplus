import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { Appointment } from '@/types'
import { transformIn } from '@/ui/procedures/tms-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'
import { WorkingDiagnosisDetailView } from '../working-diagnosis'

type TmsDetailsProps = {
  patientId: string
  appointment?: Appointment
}

const TmsDetailView = async ({ patientId, appointment }: TmsDetailsProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.ProcedureTMS],
    true,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper sectionName={QuickNoteSectionName.ProcedureTMS}>
      <Details data={transformIn(response.data)} appointment={appointment} />
      <WorkingDiagnosisDetailView patientId={patientId}/>
    </ActualNoteDetailsWrapper>
  )
}

export { TmsDetailView }
