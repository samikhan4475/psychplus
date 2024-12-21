'use client'

import { Flex, Heading } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { CreateReferralDialog } from '../create-referral-dialog'
import { useStore } from './store'

interface ReferralsHeaderProps {
  patientId: string
  appointmentId?: string
}
const ReferralsHeader = ({
  patientId,
  appointmentId,
}: ReferralsHeaderProps) => {
  const store = useStore()
  const { refetch } = zustandUseStore(store, (state) => ({
    refetch: state.refetch,
  }))

  const onClose = () => {
    refetch()
  }
  return (
    <Flex
      className="bg-white rounded-1"
      justify="between"
      align="center"
      p="2"
      width="100%"
    >
      <Heading size="4" weight="medium">
        Referrals
      </Heading>
      {appointmentId && (
        <CreateReferralDialog
          patientId={patientId}
          appointmentId={appointmentId}
          onClose={onClose}
        />
      )}
    </Flex>
  )
}

export { ReferralsHeader }
