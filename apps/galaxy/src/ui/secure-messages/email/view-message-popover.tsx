import React, { useMemo } from 'react'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Box, Popover } from '@radix-ui/themes'
import { format } from 'date-fns'
import { SecureMessage } from '../types'
import { ViewMessagePopoverDate } from './view-message-popover-date'
import { ViewMessagePopoverFrom } from './view-message-popover-from'
import { ViewMessagePopoverSubject } from './view-message-popover-subject'
import { ViewMessagePopoverTo } from './view-message-popover-to'

const ViewMessagePopover = ({
  previewSecureMessage,
}: {
  previewSecureMessage: SecureMessage | null
}) => {
  const emailCreatedOn = useMemo(
    () =>
      format(
        new Date(previewSecureMessage?.metadata?.createdOn ?? ''),
        'dd/mm/yy, HH:MM',
      ),
    [previewSecureMessage?.metadata?.createdOn],
  )

  return (
    <Popover.Root>
      <Popover.Trigger className="cursor-pointer rounded-3 p-1 hover:bg-gray-2">
        <TriangleDownIcon width="20" height="20" className="cursor-pointer" />
      </Popover.Trigger>
      <Popover.Content className="w-[377px]">
        <Box className="grid grid-cols-[auto_85%] gap-2">
          <ViewMessagePopoverFrom
            externalEmailAddress={previewSecureMessage?.externalEmailAddress}
          />
          <ViewMessagePopoverTo previewSecureMessage={previewSecureMessage} />
          <ViewMessagePopoverDate emailCreatedOn={emailCreatedOn} />
          <ViewMessagePopoverSubject subject={previewSecureMessage?.subject} />
        </Box>
      </Popover.Content>
    </Popover.Root>
  )
}

export { ViewMessagePopover }
