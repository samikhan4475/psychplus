import { Flex } from '@radix-ui/themes'
import { HistoryButton } from '../../shared'
// import { QuestionnairesStatus } from '../../constants'
import { DeleteButton } from './delete-button'
import { FilloutButtonBlock } from './fillout-button-block'
// import { SendReminderButton } from './send-reminder-button'
// import { SendToPatientButton } from './send-to-patient-button'
import { ViewButton } from './view-button'

interface RowRightButtonsProps {
  questionnaire: string
  historiesData: number
}

const RowRightButtons = ({
  questionnaire,
  historiesData,
}: RowRightButtonsProps) => {
  return (
    <Flex gap="3" align="center">
      {historiesData === 0 ? (
        <FilloutButtonBlock questionnaire={questionnaire} />
      ) : (
        <>
          <ViewButton />
          <HistoryButton questionnaire={questionnaire} justIcon />
        </>
      )}
      <DeleteButton />
    </Flex>
  )
}

export { RowRightButtons }
