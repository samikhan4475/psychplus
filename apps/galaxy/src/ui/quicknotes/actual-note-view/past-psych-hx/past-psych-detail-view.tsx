import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/past-psych-hx/past-psych-hx-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type PastPsychHxDetailsProps = {
  patientId: string
}

const PastPsychlDetailView = async ({ patientId }: PastPsychHxDetailsProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuickNoteSectionPastPsychHx],
    true,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionPastPsychHx}
    >
      <Details data={transformIn(response.data)} />
    </ActualNoteDetailsWrapper>
  )
}

export { PastPsychlDetailView }
