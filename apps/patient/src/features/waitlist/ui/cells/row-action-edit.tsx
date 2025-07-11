'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { EditIcon } from '@/components-v2'
import { Waitlist } from '../../types'
import { WaitlistDialog } from '../waitlist-dialog'

const RowActionEdit = ({ row }: { row: Waitlist }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        <EditIcon color="#60646C" />
      </IconButton>
      <WaitlistDialog open={open} setOpen={setOpen} data={row} />
    </>
  )
}

export { RowActionEdit }
