import React from 'react'
import { Badge } from '@radix-ui/themes'
import { useStore } from '../../store'
import { getRecipientLabel } from '../../utils'

const ViewMessageProfileDetailsBadge = () => {
  const { previewSecureMessage } = useStore((state) => state)

  return (
    <Badge color="gray" variant="soft" className="text-[11px] uppercase">
      {getRecipientLabel(previewSecureMessage.secureMessage?.channels)}
    </Badge>
  )
}

export { ViewMessageProfileDetailsBadge }
