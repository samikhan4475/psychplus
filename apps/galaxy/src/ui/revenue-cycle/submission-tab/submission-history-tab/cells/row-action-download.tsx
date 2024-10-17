import React from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { ClaimSubmissionHistory } from '../types'

const RowActionDownload = ({ row }: PropsWithRow<ClaimSubmissionHistory>) => {
  const downloadSubmissionDetail = () => {
    // TODO: Need to implement submission download popup
  }
  return (
    <IconButton
      onClick={downloadSubmissionDetail}
      size="1"
      color="gray"
      variant="ghost"
    >
      <DownloadIcon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionDownload }
