'use client'

import React, { useState } from 'react'
import { FileIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { EXPORT_PAYMENTS_LIST_ENDPOINT } from '@/api/endpoints'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { downloadFile } from '@/utils/download'
import {
  FileFormats,
  insurancePaymentRecordStatuses,
  InsurancePaymentSearchParams,
} from '../types'
import { SchemaType } from './insurance-payment-list-filter-form'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'

const ExportExcelButton = () => {
  const form = useFormContext<SchemaType>()
  const [isExporting, setIsExporting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const onExport = async () => {
    setIsExporting(true)
    onOpen()
    const data = form.getValues()
    const formattedData = {
      ...data,
      recordStatuses: [insurancePaymentRecordStatuses.ACTIVE],
      fromDate: formatDateToISOString(data.fromDate),
      toDate: formatDateToISOString(data.toDate, true),
    }
    const payload = sanitizeFormData(
      formattedData,
    ) as InsurancePaymentSearchParams
    const endpoint = EXPORT_PAYMENTS_LIST_ENDPOINT(FileFormats.EXCEL)
    await downloadFile(endpoint, `Insurance Payments Report`, 'POST', payload)
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
      className="absolute right-2 top-2 z-10"
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
