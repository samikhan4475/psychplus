import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'

const ViewMessagePopoverTo = () => {
  const { previewSecureMessage } = useStore((state) => state)
  const channels = previewSecureMessage.secureMessage?.channels
  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510] ">
        to:
      </Text>
      <Text className="break-words text-[12px] font-[400]">
        {`<${channels
          ?.map((channel) => channel?.externalEmail || channel?.receiverEmail)
          .join(', ')}>`}
      </Text>
    </>
  )
}

export { ViewMessagePopoverTo }
