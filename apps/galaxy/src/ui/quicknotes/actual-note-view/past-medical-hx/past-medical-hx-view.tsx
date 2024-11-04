import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/past-medical-hx/past-medical-hx-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastMedicalHxProps = {
  patientId: string
}

const PastMedicalHx = async ({ patientId }: PastMedicalHxProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionPastMedicalHx}
    >
      <Details data={transformIn(response.data)} />
    </ActualNoteDetailsWrapper>
  )
}

export { PastMedicalHx }
