import React from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { SubmissionHistoryDetailTable } from './submission-history-detail-table'

interface SubmissionHistoryDialogProps {
  activeBatchId: string
  setActiveBatchId: (batchId: string) => void
}
const SubmissionHistoryDetailDialog = ({
  activeBatchId,
  setActiveBatchId,
}: SubmissionHistoryDialogProps) => {
  return (
    <Dialog.Root
      open={!!activeBatchId}
      onOpenChange={() => {
        setActiveBatchId('')
      }}
    >
      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Submission Detail
        </Dialog.Title>

        <SubmissionHistoryDetailTable batchId={activeBatchId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default SubmissionHistoryDetailDialog
