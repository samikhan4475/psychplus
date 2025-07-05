import { Text } from '@radix-ui/themes'
import { ConversationMessage, SecureMessage } from '../../types'

const ViewMessagePopoverFrom = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  const email = message?.senderEmail
  const { senderName } = message ?? {}
  const name = [senderName?.firstName, senderName?.lastName]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510]">
        from:
      </Text>
      <Text className="bg-white break-words text-[12px] font-[400]">
        {name ? `${name} <${email}>` : `<${email}>`}
      </Text>
    </>
  )
}

export { ViewMessagePopoverFrom }
