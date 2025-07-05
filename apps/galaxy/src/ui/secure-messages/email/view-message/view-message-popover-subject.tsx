import { Text } from '@radix-ui/themes'
import { ConversationMessage, SecureMessage } from '../../types'

const ViewMessagePopoverSubject = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510]">
        subject:
      </Text>
      <Text className="break-words text-[12px] font-[400]">
        {message?.subject}
      </Text>
    </>
  )
}

export { ViewMessagePopoverSubject }
