'use client'

import { Pencil1Icon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { useStore } from '../insurance-payment-tab/store'
import { useStore as useTabStore } from '../store'
import { ClaimPayment } from '../types'

const RowActionEdit = ({
  row: { original: payment },
}: PropsWithRow<ClaimPayment>) => {
  const setPaymentPostingClaim = useStore(
    (state) => state.setPaymentPostingClaim,
  )

  const activeTab = useTabStore((state) => state.activeTab)
  const onEdit = () => {
    setPaymentPostingClaim(activeTab, payment)
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onEdit}>
      <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
    </IconButton>
  )
}

export { RowActionEdit }
