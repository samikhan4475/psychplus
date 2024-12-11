import React, { useState } from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { DOWNLOAD_CLAIM_SUBMISSION_HISTORY_ENDPOINT } from '@/api/endpoints'
import { PropsWithRow } from '@/components'
import { downloadFile } from '@/utils/download'
import { ClaimSubmissionHistory } from '../types'

const RowActionDownload = ({ row }: PropsWithRow<ClaimSubmissionHistory>) => {
  const [loading, setLoading] = useState(false)
  const downloadSubmissionDetail = async () => {
    setLoading(true)
    try {
      const endpoint = DOWNLOAD_CLAIM_SUBMISSION_HISTORY_ENDPOINT(
        row.original.id,
      )
      await downloadFile(
        endpoint,
        `submission_history_${row.original.id}`,
        'POST',
        {},
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
      onClick={downloadSubmissionDetail}
      size="1"
      color="gray"
      variant="ghost"
      loading={loading}
    >
      <DownloadIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDownload }
