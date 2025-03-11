'use client'

import React, { useState } from 'react'
import { FileIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useFormContext } from 'react-hook-form'
import { EXPORT_SUBMISSIONS_LIST_ENDPOINT } from '@/api/endpoints'
import { InsurancePolicyPriority } from '@/types'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { downloadFile } from '@/utils/download'
import { FileFormats } from '../types'
import { useStore } from './store'
import { SchemaType } from './submission-filter-form'
import { TabValue } from './types'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'

const defaultPayLoad = {
  isIncludePatientInsurancePolicy: true,
  isIncludeClaimValidation: true,
  insurancePolicyPriority: InsurancePolicyPriority.Primary,
  isSystemRejected: true,
  isIncludeLocation: true,
  isIncludePatientAppointments: true,
  isForcePaper: true,
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const ExportExcelButton = () => {
  const form = useFormContext<SchemaType>()
  const [isExporting, setIsExporting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const selectedTab = useStore((state) => state.selectedTab)
  const onExport = async () => {
    setIsExporting(true)
    onOpen()
    const data = form.getValues()
    const formattedData = {
      ...data,
      ...defaultPayLoad,
      isForcePaper: selectedTab === TabValue.PaperSubmission,
      fromDate: formatDateToISOString(data.fromDate as DateValue),
      toDate: formatDateToISOString(data.toDate as DateValue),
    }
    const payload = sanitizeFormData(formattedData)
    const endpoint = EXPORT_SUBMISSIONS_LIST_ENDPOINT(FileFormats.EXCEL)
    const fileName =
      selectedTab === TabValue.PaperSubmission
        ? 'Paper Submission Report'
        : 'Electronic Submission Report'
    await downloadFile(endpoint, fileName, 'POST', payload)
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
        className="absolute -top-[84px] right-2"
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
