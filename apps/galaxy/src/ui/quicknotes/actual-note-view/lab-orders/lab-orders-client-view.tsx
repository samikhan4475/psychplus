'use client'

import { useStore } from '@/ui/lab-orders/lab-orders-widget/store'
import { Details } from './details'

type FollowUpProps = {
  patientId?: string
  appointmentId?: string
}

const LabOrderClient = ({ patientId, appointmentId }: FollowUpProps) => {
  const data = useStore((state) => state.data)
  const filteredLabOrders =
    data?.labOrders?.filter((order) => {
      return String(order.appointmentId) === String(appointmentId)
    }) ?? []

  return <Details data={filteredLabOrders} />
}

export { LabOrderClient }
