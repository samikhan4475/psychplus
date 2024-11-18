import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'
import { transformIn } from '@/ui/procedures/tms-tab/data'

type TmsDetailsProps = {
  patientId: string
}

const TmsDetailView = async ({
  patientId,
}: TmsDetailsProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.ProcedureTMS,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.ProcedureTMS}
    >
      <Details data={transformIn(response.data)} />
    </ActualNoteDetailsWrapper>
  )
}

export { TmsDetailView }
