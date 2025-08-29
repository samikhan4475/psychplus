'use client'

import React, { useState } from 'react'
import { FileIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { exportPayerExcelAction } from '../actions'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'
import { useStore } from './store'

const ExportExcelButton = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const payload = useStore((state) => state.payload)

  const onExport = async () => {
    setIsExporting(true)
    setIsOpen(false)

    const result = await exportPayerExcelAction({ payload })

    if (result.state === 'success') {
      toast.success(result.message)
    } else {
      toast.error(result.error)
    }

    setIsExporting(false)
  }

  const onOpen = () => setIsOpen(!isOpen)

  return (
    <>
      <ConfirmationDialog
        heading="Confirmation"
        isOpen={isOpen}
        onConfirmation={onExport}
        closeDialog={onOpen}
        content="Are you sure you want to download the Report?"
      />
      <Button
        size="1"
        highContrast
        type="button"
        disabled={isExporting}
        onClick={onOpen}
      >
        <FileIcon />
        {isExporting ? 'Exporting...' : 'Export Excel'}
      </Button>
    </>
  )
}

export { ExportExcelButton }
