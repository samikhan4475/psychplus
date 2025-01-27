import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { PrescriberHistoryDialog } from '../../prescriber-history/prescriber-history-view'
import { PrescriberDataResponse } from '../../types'

const ActionsCell = ({ row }: PropsWithRow<PrescriberDataResponse>) => {
  return (
    <Flex gap="1" align="center" justify="center" className="bg-white flex-1">
      <PrescriberHistoryDialog row={row}>
        <IconButton variant="ghost">
          <CounterClockwiseClockIcon className="text-black cursor-pointer" />
        </IconButton>
      </PrescriberHistoryDialog>
    </Flex>
  )
}

export { ActionsCell }
