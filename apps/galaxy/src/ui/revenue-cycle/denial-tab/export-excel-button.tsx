'use client'

import React, { useState } from 'react'
import { FileIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'

const ExportExcelButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onExport = async () => {
    //  Export logic will be implemented here
  }
  const onOpen = () => setIsOpen(!isOpen)
  return (
    <>
      <ConfirmationDialog
        closeDialog={onOpen}
        isOpen={isOpen}
        heading="Confirmation"
        onConfirmation={onExport}
        content="Are you sure you want to download the Report?"
      />
      <Button size="1" highContrast type="button" onClick={onOpen}>
        <FileIcon />
        Export Excel
      </Button>
    </>
  )
}

export { ExportExcelButton }
