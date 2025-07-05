import { Text } from '@radix-ui/themes'
import { ConversationMessage, SecureMessage } from '../../types'

const ViewMessageToText = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  const to = message?.channels
    ?.map((channel) => {
      const name = [
        channel?.receiverName?.firstName,
        channel?.receiverName?.lastName,
      ]
        .filter(Boolean)
        .join(' ')
      const email = channel?.externalEmail || channel?.receiverEmail
      return name ? `${name} <${email}>` : `<${email}>`
    })
    .join(', ')
  return <Text className="text-pp-gray-1 flex-1 text-[12px]">to: {to}</Text>
}

export { ViewMessageToText }
