'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { ScheduledReport } from '../types'
import { ScheduleReportForm } from './schedule-report-form'

interface ScheduleReportDialogProps {
  open?: boolean
  onClose?: () => void
  data?: ScheduledReport
}
const ScheduleReportDialog = ({
  open,
  onClose,
  data,
}: ScheduleReportDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative min-w-[769px] rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="font-medium">
          Schedule Report
        </Dialog.Title>
        <ScheduleReportForm onSuccess={onClose} scheduleData={data} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ScheduleReportDialog }
