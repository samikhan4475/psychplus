'use client'

import { useState } from 'react'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { Edit2Icon, Pen } from '@/components/icons'
import { ScheduleReportDialog } from './schedule-report-dialog'
import { ScheduledReport } from './types'

const RowActionEdit = ({
  row: { original: data },
}: PropsWithRow<ScheduledReport>) => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <IconButton size="1" color="gray" variant="ghost" onClick={onOpen}>
        <Edit2Icon width={16} height={16} />
      </IconButton>
      <ScheduleReportDialog
        open={open}
        onClose={onClose}
        data={open ? data : undefined}
      />
    </>
  )
}

export { RowActionEdit }
