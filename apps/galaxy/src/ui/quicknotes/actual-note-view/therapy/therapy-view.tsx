import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/therapy/therapy-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type TherapyProps = {
  patientId: string
}

const Therapy = async ({ patientId }: TherapyProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionTherapy,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionTherapy}
    >
      <Details data={transformIn(response.data)} />
    </ActualNoteDetailsWrapper>
  )
}

export { Therapy }
