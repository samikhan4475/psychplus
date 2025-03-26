'use client'

import { useStore } from '@/ui/follow-up/follow-up-widget/store'
import { Details } from './details'

type FollowUpProps = {
  patientId: string
  appointmentId: string
}

const FollowUpClient = ({ patientId, appointmentId }: FollowUpProps) => {
  const data = useStore((state) => state.data)
  const followupDenialReason = useStore((state) => state.followupDenialReason)
  const isFollowupDenied = useStore((state) => state.isFollowupDenied)

  return (
    <Details
      data={data ?? []}
      isFollowupDenied={isFollowupDenied}
      followupDenialReason={followupDenialReason}
    />
  )
}

export { FollowUpClient }
