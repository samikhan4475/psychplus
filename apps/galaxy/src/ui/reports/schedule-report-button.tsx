'use client'

import { useState } from 'react'
import { Button, Text } from '@radix-ui/themes'
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
        className="text-black 'w-fit flex h-[24px] items-center justify-center px-2 py-1"
      >
        <Text className="text-pp-black-1 text-[12px] font-regular">
          Schedule Report
        </Text>
      </Button>
      <ScheduleReportDialog open={open} onClose={onClose} />
    </>
  )
}

export { ScheduleReportButton }
