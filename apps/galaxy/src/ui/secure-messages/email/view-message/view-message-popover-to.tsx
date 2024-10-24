import React from 'react'
import { Text } from '@radix-ui/themes'
import { SecureMessage } from '../../types'

const ViewMessagePopoverTo = ({
  previewSecureMessage,
}: {
  previewSecureMessage?: Partial<SecureMessage> | null
}) => {
  return (
    <>
      <Text className="text-pp-gray-3 text-right text-[12px] font-[510] ">
        to:
      </Text>
      <Text className="break-words text-[12px] font-[400]">
        {`<${previewSecureMessage?.channels
          ?.map((channel) => channel?.externalEmail)
          .join(', ')}>`}
      </Text>
    </>
  )
}

export { ViewMessagePopoverTo }
