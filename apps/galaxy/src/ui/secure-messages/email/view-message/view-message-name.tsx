import { Text } from '@radix-ui/themes'
import { ConversationMessage, SecureMessage } from '../../types'

const ViewMessageCreatedByFullName = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  const senderName = message.senderName

  if (!senderName) {
    return null
  }

  const createdByFullName = `${senderName.firstName} ${senderName.lastName}`

  return (
    <Text size="1" className="mr-1 text-[14px]" weight='medium'>
      {createdByFullName || 'N/A'}
    </Text>
  )
}

export { ViewMessageCreatedByFullName }
