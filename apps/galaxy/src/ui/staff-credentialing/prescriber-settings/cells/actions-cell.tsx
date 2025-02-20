import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { PrescriberDataResponse } from '../../types'
import { PrescriberHistoryPopover } from '../../prescriber-history'

const ActionsCell = ({ row }: PropsWithRow<PrescriberDataResponse>) => {

  return (
    <Flex gap="1" align="center" justify="center" className="bg-white flex-1">
      <PrescriberHistoryPopover row={row}>
        <IconButton variant="ghost">
          <CounterClockwiseClockIcon className="text-black cursor-pointer" />
        </IconButton>
      </PrescriberHistoryPopover>
    </Flex>
  )
}

export { ActionsCell }