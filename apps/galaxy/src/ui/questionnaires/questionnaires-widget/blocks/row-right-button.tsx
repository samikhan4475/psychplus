import { Flex } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HistoryButton } from '../../shared'
import { ViewButton } from '../../shared/view/view-button'
import { DeleteButton } from './delete-button'
import { FilloutButtonBlock } from './fillout-button-block'

interface RowRightButtonsProps {
  questionnaire: string
  historiesData: number
  viewData: QuickNoteHistory
}

const RowRightButtons = ({
  questionnaire,
  historiesData,
  viewData,
}: RowRightButtonsProps) => {
  return (
    <Flex gap="4" align="center" justify='between' mr='1'>
      {historiesData === 0 && (
        <FilloutButtonBlock questionnaire={questionnaire} />
      )}
      {historiesData === 1 && viewData && (
        <ViewButton
          justIcon={true}
          data={viewData?.data}
          quickNoteSectionName={viewData?.sectionName as QuickNoteSectionName}
        />
      )}
      {historiesData > 0 && (
        <HistoryButton questionnaire={questionnaire} justIcon />
      )}
      {historiesData < 2 && <DeleteButton questionnaireDate = {viewData?.createdOn} questionnaire={questionnaire} />}
    </Flex>
  )
}

export { RowRightButtons }
