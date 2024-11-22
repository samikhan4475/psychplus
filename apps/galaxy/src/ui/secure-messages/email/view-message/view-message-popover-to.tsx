import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

const ViewMessagePopoverTo = () => {
  const { previewSecureMessage } = useStore((state) => state)
  const channels = previewSecureMessage.secureMessage?.channels

  const to = channels
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

  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510] ">
        to:
      </Text>
      <Text className="break-words text-[12px] font-[400]">{to}</Text>
    </>
  )
}

export { ViewMessagePopoverTo }
