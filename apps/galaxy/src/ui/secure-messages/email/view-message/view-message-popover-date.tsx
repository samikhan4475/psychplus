import React, { useMemo } from 'react'
import { Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { useStore } from '../../store'

const ViewMessagePopoverDate = () => {
  const { previewSecureMessage } = useStore((state) => state)

  const emailCreatedOn = useMemo(
    () =>
      format(
        new Date(previewSecureMessage.secureMessage?.metadata?.createdOn ?? ''),
        'dd/mm/yy, HH:MM',
      ),
    [previewSecureMessage.secureMessage?.metadata?.createdOn],
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
