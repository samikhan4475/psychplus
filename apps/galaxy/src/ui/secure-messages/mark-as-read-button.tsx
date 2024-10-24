import React from 'react'
import { Button, Tooltip } from '@radix-ui/themes'
import { MailIcon } from '@/components/icons'

const MarkAsReadButton = ({
  onSubmit,
}: {
  onSubmit: (action: string) => void
}) => (
  <Tooltip content="Mark as Read">
    <Button
      className="hover:bg-pp-table-subRows h-[16px] rounded-2 bg-transparent p-[2px] [box-shadow:none]"
      type="button"
      onClick={(e) => {
        e?.stopPropagation()
        onSubmit('messageStatus')
      }}
    >
      <MailIcon className="fill-pp-icon-sub" />
    </Button>
  </Tooltip>
)

export { MarkAsReadButton }
