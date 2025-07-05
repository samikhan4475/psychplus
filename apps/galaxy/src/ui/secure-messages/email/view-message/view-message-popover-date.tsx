import { useMemo } from 'react'
import { Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { formatDateTime } from '@/utils'
import { ConversationMessage, SecureMessage } from '../../types'

const ViewMessagePopoverDate = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  const emailCreatedOn = useMemo(
    () => formatDateTime(message?.metadata?.createdOn),
    [message?.metadata?.createdOn],
  )
  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510]">
        date:
      </Text>
      <Text className="break-words text-[12px] font-[400]">
        {emailCreatedOn}
      </Text>
    </>
  )
}

export { ViewMessagePopoverDate }
