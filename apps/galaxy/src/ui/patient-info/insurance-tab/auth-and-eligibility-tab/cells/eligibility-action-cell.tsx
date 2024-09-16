'use client'

import { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { ViewIcon } from '@/components/icons'
import { EligibilityResponseDialog } from '../../dialogs'

const EligibilityActionCell = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <Box className="px-1">
      <ViewIcon
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={onOpen}
      />
      <EligibilityResponseDialog open={open} onClose={onClose} />
    </Box>
  )
}

export { EligibilityActionCell }
