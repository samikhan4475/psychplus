import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type WorkingDiagnosisDetailProps = {
  patientId: string
}

const CodesDetailsView = async ({ patientId }: WorkingDiagnosisDetailProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionPrimaryCode,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionPrimaryCode}
    >
      <Details data={response.data} />
    </ActualNoteDetailsWrapper>
  )
}

export { CodesDetailsView }
