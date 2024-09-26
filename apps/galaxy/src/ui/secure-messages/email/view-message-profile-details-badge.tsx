import React from 'react'
import { Badge } from '@radix-ui/themes'

const ViewMessageProfileDetailsBadge = ({
  sendMode,
}: {
  sendMode?: string
}) => {
  return (
    <Badge color="gray" variant="soft" className="text-[11px] uppercase">
      {sendMode}
    </Badge>
  )
}

export { ViewMessageProfileDetailsBadge }
