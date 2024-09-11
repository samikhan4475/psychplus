import { type Row } from '@tanstack/react-table'

interface PatientNotification {
  id: number
  patientId: number
  appointmentId: number
  autoReminderId: number
  sentOn: string
  sentBy: number
  notificationMethod: string
  notificationAddress: string
  message: string
  responseReceivedOn?: string
  responseReceived?: string
  deliveryStatus?: string
  externalServiceId?: string
}

type PatientNotificationRow = Row<PatientNotification>

interface GetPatientNotificationsResponse {
  notifications: PatientNotification[]
}

interface NotificationSearchParams {
  patientId?: string
  notificationMethod?: string
  deliveryStatus?: string
  externalServiceId?: string
  sentFrom?: string
  sentTo?: string
}

export type {
  PatientNotification,
  PatientNotificationRow,
  GetPatientNotificationsResponse,
  NotificationSearchParams,
}
