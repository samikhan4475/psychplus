'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import type { Claim } from '@/types'
import { useStore } from '../store'

const RowActionEdit = ({ row: { original: claim } }: PropsWithRow<Claim>) => {
  const setActiveTab = useStore((state) => state.setActiveTab)

  const onOpenClaim = () => {
    setActiveTab('Claim# ' + claim.claimNumber)
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onOpenClaim}>
      <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionEdit }
