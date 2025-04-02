'use client'

import React, { useState } from 'react'
import { FileIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { EXPORT_DENIAL_LIST_ENDPOINT } from '@/api/endpoints'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { downloadFile } from '@/utils/download'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'
import {
  DenialListPayload,
  FileFormats,
} from '../types'
import { useStore } from './store'

const ExportExcelButton = () => {
  const [isExporting, setIsExporting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const data = useStore((state) => state.payload)
  const onExport = async () => {
    setIsExporting(true)
    onOpen()
    const formattedData = {
      ...data,
      dateOfServiceFrom: formatDateToISOString(
        data?.dateOfServiceFrom as DateValue,
      ),
      dateOfServiceTo: formatDateToISOString(
        data?.dateOfServiceTo as DateValue,
        true,
      ),
    }
    const payload = sanitizeFormData(
      formattedData,
    ) as DenialListPayload
    const endpoint = EXPORT_DENIAL_LIST_ENDPOINT(FileFormats.EXCEL)
    await downloadFile(endpoint, `Denial Report`, 'POST', payload)
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
        Export Excel
      </Button>
    </>
  )
}

export { ExportExcelButton }
