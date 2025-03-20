'use client'

import { useStore } from '@/ui/lab-orders/lab-orders-widget/store'
import { Details } from './details'

type FollowUpProps = {
  patientId?: string
  appointmentId?: string
}

const LabOrderClient = ({ patientId, appointmentId }: FollowUpProps) => {
  const data = useStore((state) => state.data)
  return <Details data={data?.labOrders ?? []} />
}

export { LabOrderClient }
