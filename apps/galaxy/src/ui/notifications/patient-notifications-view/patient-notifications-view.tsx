'use client'

import { WidgetContainer } from '@/components'
import { NotificationFilterForm } from './notification-filter-form'
import { PatientNotificationsTable } from './patient-notifications-table'

interface PatientReferralsWidgetProps {
  patientId: string
}

const PatientNotificationsView = ({
  patientId,
}: PatientReferralsWidgetProps) => {
  return (
    <WidgetContainer title="Notification">
      <NotificationFilterForm patientId={patientId} />
      <PatientNotificationsTable patientId={patientId} />
    </WidgetContainer>
  )
}

export { PatientNotificationsView }
