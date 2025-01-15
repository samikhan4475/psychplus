'use client'

import { useStore } from '@/ui/follow-up/follow-up-widget/store'

import { Details } from './details'

type FollowUpProps = {
  patientId: string
  appointmentId: string
}

const FollowUpClient = ({ patientId, appointmentId }: FollowUpProps) => {
  const data = useStore((state) => state.data)
  return <Details data={data ?? []} />
}

export { FollowUpClient }
