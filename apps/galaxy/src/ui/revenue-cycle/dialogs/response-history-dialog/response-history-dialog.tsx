'use client'

import { useState } from 'react'
import { EyeOpenIcon } from '@radix-ui/react-icons'
import { Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { ResponseHistoryRecord } from '../../types'
import { ResponseHistoryDetailTable } from './response-history-table'

interface DialogProps {
  data: ResponseHistoryRecord
}

const ResponseHistoryDialog = ({ data }: DialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Tooltip content="View Response History Detail">
        <Dialog.Trigger>
          <IconButton size="1" color="gray" variant="ghost">
            <EyeOpenIcon width={16} height={16} className="text-pp-gray-1" />{' '}
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>

      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Submission Detail
        </Dialog.Title>

        <ResponseHistoryDetailTable batchId={data.id} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ResponseHistoryDialog }
