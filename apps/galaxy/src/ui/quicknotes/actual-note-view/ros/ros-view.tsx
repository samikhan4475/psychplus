import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/ros/ros-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type ReviewOfSystemProps = {
  patientId: string
}

const ReviewOfSystem = async ({ patientId }: ReviewOfSystemProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuicknoteSectionReviewOfSystem],
    true,
  )
  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionReviewOfSystem}
    >
      <Details data={transformIn(response.data)} />
    </ActualNoteDetailsWrapper>
  )
}

export { ReviewOfSystem }
