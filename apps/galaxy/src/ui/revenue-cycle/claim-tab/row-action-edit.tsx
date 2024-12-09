'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { Claim } from '@/types'
import { useStore } from '../store'

const RowActionEdit = ({ row: { original: claim } }: PropsWithRow<Claim>) => {
  const { setSelectedClaim, setActiveTab, setSelectedClaimStatus } = useStore(
    (state) => ({
      setActiveTab: state.setActiveTab,
      setSelectedClaim: state.setSelectedClaim,
      setSelectedClaimStatus: state.setSelectedClaimStatus,
    }),
  )
  const onOpenClaim = () => {
    setActiveTab('Claim# ' + claim.claimNumber)
    setSelectedClaim(claim.id)
    setSelectedClaimStatus(claim.claimStatusCode)
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onOpenClaim}>
      <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionEdit }
