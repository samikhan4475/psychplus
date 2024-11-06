'use client'

import { useState } from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { DOWNLOAD_PATIENT_STATEMENTS_ENDPOINT } from '@/api/endpoints'
import { type PropsWithRow } from '@/components'
import { downloadFile } from '@/utils/download'
import {
  FileFormats,
  patientStatementRecordStatuses,
  patientStatementSlaimStatusCodes,
  type PatientStatement,
} from '../types'

const RowActionDownload = ({
  row: { original: record },
}: PropsWithRow<PatientStatement>) => {
  const [loading, setLoading] = useState(false)
  const downloadStatement = async () => {
    setLoading(true)
    try {
      const endpoint = DOWNLOAD_PATIENT_STATEMENTS_ENDPOINT(FileFormats.PDF)
      const params = new URLSearchParams()
      const fullUrl = `${endpoint}?${params.toString()}`

      const payload = {
        patientIds: [record.patientId],
        claimStatusCodes: [patientStatementSlaimStatusCodes.BILLED_TO_PATIENT],
        recordStatuses: [patientStatementRecordStatuses.ACTIVE],
        includeServiceLinePayment: true,
        isGroupedByPatient: true,
      }

      await downloadFile(
        fullUrl,
        `patient_statement_${record.patientId}`,
        'POST',
        payload,
      )

      toast.success('Downloaded successfully')
    } catch (error) {
      const message =
        (error instanceof Error && error.message) || 'Failed to download.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      onClick={downloadStatement}
      loading={loading}
    >
      <DownloadIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDownload }
