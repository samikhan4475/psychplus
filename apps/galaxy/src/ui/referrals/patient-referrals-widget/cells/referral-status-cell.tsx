'use client'

import { useState } from 'react'
import { SelectCell } from '@/components'
import type { PatientReferralRow } from '../types'

interface ReferralStatusCellProps {
  row: PatientReferralRow
}
const ReferralStatusCell = ({ row }: ReferralStatusCellProps) => {
  const [loading, setLoading] = useState(false)
  const [referralStatus, setReferralStatus] = useState(
    row.original.referralStatus,
  )

  return (
    <SelectCell
      value={referralStatus}
      onValueChange={(value) => {
        const currentStatus = referralStatus

        setLoading(true)
        setReferralStatus(value)

        // TODO: call update referral action with new data
        // If success, show toast message and set loading to false
        // If error, show error toast message and set loading to false and set referralStatus back to currentStatus
      }}
      options={[
        { label: 'Completed', value: 'Completed' },
        { label: 'Incomplete', value: 'Incomplete' },
        { label: 'Deleted', value: 'Deleted' },
      ]}
      className={
        {
          Completed: 'bg-pp-success-bg text-pp-success-text',
          Incomplete: 'bg-pp-warning-bg text-pp-warning-text',
          Deleted: 'bg-gray-3 text-gray-10',
        }[referralStatus]
      }
      disabled={loading}
    />
  )
}

export { ReferralStatusCell }
