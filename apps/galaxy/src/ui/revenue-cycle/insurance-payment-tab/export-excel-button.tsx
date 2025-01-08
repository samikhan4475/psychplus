'use client'

import React, { useState } from 'react'
import { FileIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { EXPORT_PAYMENTS_LIST_ENDPOINT } from '@/api/endpoints'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { downloadFile } from '@/utils/download'
import {
  FileFormats,
  insurancePaymentRecordStatuses,
  InsurancePaymentSearchParams,
} from '../types'
import { SchemaType } from './insurance-payment-list-filter-form'

const ExportExcelButton = () => {
  const form = useForm<SchemaType>()
  const [isExporting, setIsExporting] = useState(false)
  const onExport = async () => {
    setIsExporting(true)
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
  return (
    <Button
      className="absolute right-2 top-2 z-10"
      size="1"
      highContrast
      type="button"
      disabled={isExporting}
      onClick={onExport}
    >
      <FileIcon />
      Export Excel
    </Button>
  )
}

export { ExportExcelButton }
