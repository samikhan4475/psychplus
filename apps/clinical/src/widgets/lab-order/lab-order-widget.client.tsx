'use client'

import { LabOrderTable } from './components/lab-order-table'

const LabOrderWidgetClient = ({
  patientId,
  appointmentId,
}: {
  patientId: string
  appointmentId: string
}) => {
  return <LabOrderTable patientId={patientId} appointmentId={appointmentId} />
}

export { LabOrderWidgetClient }
