'use client'

import { Text } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { formatDateCell, formatTimeCell } from '@/ui/schedule/utils'
import { BlockContainer } from '../shared'

const Details = ({
  data,
  isFollowupDenied,
  followupDenialReason,
}: {
  data: Appointment[]
  isFollowupDenied: boolean
  followupDenialReason: string
}) => {
  const isFollowupDeniedWithReason = isFollowupDenied && followupDenialReason

  return (
    <BlockContainer heading="Follow Up in weeks">
      {isFollowupDeniedWithReason ? (
        <>
          <Text size="1">
            Patient did not want to follow up for this service at this time
          </Text>
          <Text size="1">Reason: {followupDenialReason}</Text>
        </>
      ) : (
        data.map((row) => (
          <Text size="1" key={row.appointmentDate}>
            {formatDateCell(row.appointmentDate, row.locationTimezoneId)}{' '}
            {formatTimeCell(row.appointmentDate, row.locationTimezoneId)} |{' '}
            {row.providerName} | {row.locationName} | {row.visitType}
          </Text>
        ))
      )}
    </BlockContainer>
  )
}

export { Details }
