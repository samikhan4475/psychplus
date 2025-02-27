import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { HistoryButton } from '@/ui/questionnaires/shared'
import { ViewButton } from '@/ui/questionnaires/shared/view/view-button'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { ScoreBlock } from './score-block'

const Badge = ({ text }: { text: string }) => {
  return (
    <Flex
      className="bg-pp-green-100 border-pp-green-2 rounded-5 border border-solid"
      align="center"
      pl="2"
      pr="2"
    >
      <Text className="text-pp-green-1 text-1 font-regular">{text}</Text>
    </Flex>
  )
}

interface QuestionaireBlockProps {
  title: string
  questionaireData?: QuickNoteHistory
  questionaireSectionName: QuickNoteSectionName
}

const QuestionaireBlock = ({
  title,
  questionaireSectionName,
  questionaireData,
}: QuestionaireBlockProps) => {
  const hasData = !!questionaireData?.data

  return (
    <Flex
      direction="row"
      className="border-pp-grey rounded-2 border border-solid align-middle"
      p="1"
      justify="between"
    >
      <Flex direction="row" align="center" gap="2">
        <Text className="text-pp-black-3 text-1 font-[600]">{title}</Text>
        {hasData && (
          <>
            <ScoreBlock data={questionaireData.data} />
            <Badge text="Completed" />
          </>
        )}
      </Flex>

      {hasData && (
        <Flex direction="row" align="center" gap="2">
          <HistoryButton questionnaire={questionaireSectionName} />
          <ViewButton
            data={questionaireData.data}
            quickNoteSectionName={questionaireSectionName}
          />
        </Flex>
      )}
    </Flex>
  )
}

export { QuestionaireBlock }
