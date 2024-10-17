import React, { useState } from 'react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import SubmissionHistoryDetailDialog from '@/ui/revenue-cycle/dialogs/submission-history-detail-dialog/submission-history-detail-dialog'
import { ClaimSubmissionHistory } from '../types'

const RowActionDetail = ({
  row: { original: record },
}: PropsWithRow<ClaimSubmissionHistory>) => {
  const [activeBatchId, setActiveBatchId] = useState<string>('')
  const showSubmissionDetail = () => {
    setActiveBatchId(record.id)
  }
  return (
    <IconButton size="1" color="gray" variant="ghost">
      <InfoCircledIcon
        onClick={showSubmissionDetail}
        width={16}
        height={16}
        className="text-pp-gray-1"
      />
      <SubmissionHistoryDetailDialog
        activeBatchId={activeBatchId}
        setActiveBatchId={setActiveBatchId}
      />
    </IconButton>
  )
}

export { RowActionDetail }
