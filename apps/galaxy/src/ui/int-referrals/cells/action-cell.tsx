'use client'

import { Flex } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { EditIntReferralDialog } from '../edit-int-referral-dialog'
import { useStore } from '../store'

interface ActionCellProps extends PropsWithRow<PatientReferral> {
  isTabView?: boolean
}
const ActionCell = ({ row: { original: referral } }: ActionCellProps) => {
  const store = useStore()
  const { refetch } = zustandUseStore(store, (state) => ({
    refetch: state.refetch,
  }))
  const onClose = () => {
    refetch()
  }

  return (
    <Flex justify="center" gap="1" width="100%">
      <EditIntReferralDialog referral={referral} onClose={onClose} />
    </Flex>
  )
}

export { ActionCell }
