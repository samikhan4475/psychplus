'use client'

import React, { useState } from 'react'
import { FileIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { EXPORT_CLAIMS_LIST_ENDPOINT } from '@/api/endpoints'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { downloadFile } from '@/utils/download'
import { FileFormats } from '../types'
import { SchemaType } from './claims-list-filter-form'

const defaultPayLoad = {
  isIncludePatientInsurancePlan: false,
  isIncludePatientInsurancePolicy: true,
  isIncludeClaimValidation: true,
  isIncludePatientAppointments: true,
  isSystemRejected: true,
  isIncludeLocation: true,
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const ExportExcelButton = () => {
  const form = useForm<SchemaType>()
  const [isExporting, setIsExporting] = useState(false)
  const onExport = async () => {
    setIsExporting(true)
    const data = form.getValues()
    const formattedData = {
      ...data,
      ...defaultPayLoad,
      isIncludePatientInsurancePlan: data.insuranceId !== '',
      dateType: data.dateType ? data.dateType : 'DateOfService',
      fromDate: formatDateToISOString(data.fromDate),
      toDate: formatDateToISOString(data.toDate, true),
      isIncludePatient: true,
      isIncludeDiagnosis: true,
      isIncludeServiceLine: true,
    }
    const payload = sanitizeFormData(formattedData)
    const endpoint = EXPORT_CLAIMS_LIST_ENDPOINT(FileFormats.EXCEL)
    await downloadFile(endpoint, `Claims Report`, 'POST', payload)
    setIsExporting(false)
  }
  return (
    <Button
      className="absolute right-2 top-2"
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
