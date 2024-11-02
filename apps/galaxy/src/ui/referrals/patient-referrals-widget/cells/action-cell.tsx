'use client'

import { Flex } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { PatientReferral } from '@/types'
import { EditReferralDialog } from '../../edit-referral-dialog'
import { useStore } from '../store'

const ActionCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const store = useStore()
  const { refetch } = zustandUseStore(store, (state) => ({
    refetch: state.refetch,
  }))
  const onClose = () => {
    refetch()
  }

  return (
    <Flex justify="center" width="100%">
      <EditReferralDialog referral={referral} onClose={onClose} />
    </Flex>
  )
}

export { ActionCell }
