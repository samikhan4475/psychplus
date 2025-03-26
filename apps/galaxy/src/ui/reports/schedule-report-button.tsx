'use client'

import { Button, Text } from '@radix-ui/themes'
import { useState } from 'react'
import { ScheduleReportDialog } from './schedule-report-dialog'

const ScheduleReportButton = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  return (
    <>
      <Button
        variant="outline"
        color="gray"
        type="button"
        onClick={onOpen}
        className="text-black 'w-fit h-[24px] py-1 px-2 flex items-center justify-center"
      >
        <Text className="text-[12px] font-regular text-pp-black-1">Schedule Report</Text>
      </Button>
      <ScheduleReportDialog open={open} onClose={onClose} />
    </>
  )
}

export { ScheduleReportButton }
