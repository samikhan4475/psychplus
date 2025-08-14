import { Flex } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { BlockContainer } from '@/ui/quicknotes/actual-note-view/shared'
import { getNoShowAnswerLabel, getQuestionLabel } from '../../utils'
import { QuestionnaireLabelAndValue } from './label-value'

interface QuestionnaireBlockParams {
  data: QuickNoteSectionItem[]
}

export const QuestionnaireBlock = ({ data }: QuestionnaireBlockParams) => {
  const questionOrder = [
    'patientContactedTwiceQ1',
    'patientRespondedQ2',
    'safetyConcernQ3',
    'welfareCheckDoneQ4',
    'patientResponseQ5',
    'patientEducatedQ6',
    'comments',
  ]

  const sortedData = [...data].sort((a, b) => {
    const aIndex = questionOrder.indexOf(a.sectionItem)
    const bIndex = questionOrder.indexOf(b.sectionItem)
    return aIndex - bIndex
  })

  return (
    <BlockContainer heading="No Show">
      <Flex gap="2" display={'flex'} direction="column">
        {sortedData.map((noteSectionItem: QuickNoteSectionItem) => (
          <QuestionnaireLabelAndValue
            key={noteSectionItem.id}
            className=" max-w-[500px] font-light"
            label={`${getQuestionLabel(noteSectionItem.sectionItem)}:`}
            value={getNoShowAnswerLabel(
              noteSectionItem.sectionItem,
              noteSectionItem.sectionItemValue,
            )}
          />
        ))}
      </Flex>
    </BlockContainer>
  )
}
