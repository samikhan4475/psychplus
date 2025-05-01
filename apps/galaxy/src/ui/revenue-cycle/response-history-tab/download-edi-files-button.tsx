import React, { useState } from 'react'
import { Button, Text } from '@radix-ui/themes'
import { ArrowDownFromLine } from 'lucide-react'
import toast from 'react-hot-toast'
import { downloadEdiFilesAction } from '../actions'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'

const DownloadEdiFilesButton = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const onDownload = async () => {
    if (!isConfirmationOpen) return setIsConfirmationOpen(true)
    setIsConfirmationOpen(false)
    setIsDownloading(true)
    const result = await downloadEdiFilesAction()
    if (result.state === 'error') {
      toast.error(result.error)
    } else {
      toast.success(result.data)
    }
    setIsDownloading(false)
  }

  return (
    <>
      <ConfirmationDialog
        closeDialog={() => setIsConfirmationOpen(false)}
        isOpen={isConfirmationOpen}
        onConfirmation={onDownload}
        heading="Confirmation"
        content="Are you sure you want to download files?"
      />
      <Button
        size="1"
        loading={isDownloading}
        onClick={onDownload}
        className="min-w-fit space-x-1 px-2 "
        type="button"
        variant="outline"
        color="gray"
      >
        <ArrowDownFromLine size={14} />
        <Text size="1" weight="bold">
          Download Files
        </Text>
      </Button>
    </>
  )
}

export { DownloadEdiFilesButton }
