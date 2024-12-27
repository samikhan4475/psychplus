'use client'

import { Flex } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { EditReferralDialog } from '../../edit-referral-dialog'
// import { BookButton } from '../book-button'
import { DeleteReferralButton } from '../delete-button'
import { useStore } from '../store'

interface ActionCellProps extends PropsWithRow<PatientReferral> {
  isTabView?: boolean
}
const ActionCell = ({
  row: { original: referral },
  isTabView,
}: ActionCellProps) => {
  const store = useStore()
  const { refetch } = zustandUseStore(store, (state) => ({
    refetch: state.refetch,
  }))
  const onClose = () => {
    refetch()
  }

  return (
    <Flex justify="center" gap="1" width="100%">
      {isTabView && <DeleteReferralButton referral={referral} />}
      <EditReferralDialog referral={referral} onClose={onClose} />
      {/*Delayed implementation : {isTabView && <BookButton referral={referral} />} */}
    </Flex>
  )
}

export { ActionCell }
