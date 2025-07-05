import { Text } from '@radix-ui/themes'
import { ConversationMessage, SecureMessage } from '../../types'

const ViewMessageHeaderTitle = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  return <Text className="text-[16px] font-[510]">{message?.subject}</Text>
}

export { ViewMessageHeaderTitle }
