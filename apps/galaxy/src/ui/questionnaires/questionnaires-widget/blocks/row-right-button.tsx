import { Flex } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HistoryButton } from '../../shared'
import { ViewButton } from '../../shared/view/view-button'
import { DeleteButton } from './delete-button'
import { FilloutButtonBlock } from './fillout-button-block'

interface RowRightButtonsProps {
  questionnaire: string
  historiesData: QuickNoteHistory[]
  filteredHistories: QuickNoteHistory[]
}

const RowRightButtons = ({
  questionnaire,
  historiesData,
  filteredHistories,
}: RowRightButtonsProps) => {
  const viewData = filteredHistories[0]
  const showButton =
    filteredHistories.length > 0 && filteredHistories.length < 2

  return (
    <Flex gap="4" align="center" justify="between" mr="1">
      {historiesData.length === 0 && (
        <FilloutButtonBlock questionnaire={questionnaire} />
      )}
      {showButton && (
        <ViewButton
          justIcon={true}
          data={viewData?.data}
          quickNoteSectionName={viewData?.sectionName as QuickNoteSectionName}
        />
      )}
      {historiesData.length > 0 && (
        <HistoryButton questionnaire={questionnaire} justIcon />
      )}
      {showButton && (
        <DeleteButton
          questionnaireDate={viewData?.createdOn}
          questionnaire={questionnaire}
        />
      )}
    </Flex>
  )
}

export { RowRightButtons }
