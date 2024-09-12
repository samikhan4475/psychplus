'use client'

import { ToastProvider } from '@/providers'
import { LabOrdersTable } from './components'

const EditLabOrderWidgetClient = ({
  patientId,
  appointmentId,
  orderId,
}: {
  patientId: string
  appointmentId: string
  orderId: string
}) => {
  return (
    <ToastProvider>
      <LabOrdersTable
        patientId={patientId}
        appointmentId={appointmentId}
        orderId={orderId}
      />
    </ToastProvider>
  )
}

export { EditLabOrderWidgetClient }
