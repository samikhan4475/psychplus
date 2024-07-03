'use client'

import { ClaimHistoryTable } from '../claim-history-table'

const ClaimWidget = ({ claimId }: { claimId: string }) => (
  <ClaimHistoryTable claimId={claimId} />
)

export { ClaimWidget }
