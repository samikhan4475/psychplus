import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { tmsKeys, transformIn } from '@/ui/assessment-plan/tcm-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type TcmProps = {
  patientId: string
  appointmentId: string
}

const TcmView = async ({ patientId, appointmentId }: TcmProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionTcm,
    appointmentId,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionTcm}
    >
      <Details keys={tmsKeys} data={transformIn(response.data)} />
    </ActualNoteDetailsWrapper>
  )
}

export { TcmView }
