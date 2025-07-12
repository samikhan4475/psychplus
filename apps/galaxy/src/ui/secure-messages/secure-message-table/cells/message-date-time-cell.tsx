import { Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import { SecureMessage } from '../../types'

const MessageDateTimeCell = ({ row }: { row: Row<SecureMessage> }) => {
  const dateTime =
    row?.original?.lastMessageDate || row?.original?.metadata?.createdOn
  const [date, time] = formatDateTime(dateTime)?.split(' ') || []

  return (
    <TextCell className="text-[12px] font-[400]">
      {date}
      <Text className="text-pp-text-sub pl-1 text-[12px] font-[400]">
        {time}
      </Text>
    </TextCell>
  )
}

export { MessageDateTimeCell }
