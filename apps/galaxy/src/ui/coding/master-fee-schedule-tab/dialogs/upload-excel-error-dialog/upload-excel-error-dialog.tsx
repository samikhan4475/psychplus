import React from 'react'
import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components'
import { UploadExcelErrorDialogView } from './upload-excel-error-dialog-view'
import { ParsedResponse } from './utils'

interface UploadExcelErrorDialogProps {
  closeErrorDialog: () => void
  fileResponse: ParsedResponse
}

const UploadExcelErrorDialog = ({
  closeErrorDialog,
  fileResponse,
}: UploadExcelErrorDialogProps) => {
  return (
    <Dialog.Root open={true} onOpenChange={closeErrorDialog}>
      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger onClick={closeErrorDialog} />
        <Dialog.Title className="flex items-end gap-1 font-sans -tracking-[0.25px]">
          Upload Excel Errors
        </Dialog.Title>
        <UploadExcelErrorDialogView {...fileResponse} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default UploadExcelErrorDialog
