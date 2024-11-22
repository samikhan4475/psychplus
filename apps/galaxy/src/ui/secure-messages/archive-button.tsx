import React from 'react'
import { Button, Tooltip } from '@radix-ui/themes'
import { ArchiveIcon } from '@/components/icons'
import { Channel, RecordStatus } from './types'

const ArchiveButton = ({
  channel,
  onSubmit,
}: {
  channel: Channel
  onSubmit: (action: string) => void
}) => (
  <Tooltip
    content={
      channel.recordStatus === RecordStatus.ARCHIVED ? 'Unarchive' : 'Archive'
    }
  >
    <Button
      type="button"
      variant="outline"
      className="hover:bg-pp-table-subRows h-[16px] rounded-2 bg-transparent p-[2px] [box-shadow:none]"
      onClick={(e) => {
        e?.stopPropagation()
        onSubmit('recordStatus')
      }}
    >
      <ArchiveIcon className="fill-pp-icon-sub" />
    </Button>
  </Tooltip>
)

export { ArchiveButton }
