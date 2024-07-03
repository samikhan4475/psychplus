'use client'

import { Box } from '@radix-ui/themes'
import { ClaimHistoryDialog } from './claim-history-dialog'

const WidgetScreen = () => {
  const ClaimId = '20FF57A0-5889-4E27-8527-9E7DE8DCC653'

  return (
    <Box m="7">
      <ClaimHistoryDialog claimId={ClaimId} />
    </Box>
  )
}

export { WidgetScreen }
