import { DateValue } from 'react-aria-components'


interface PharmacyNotifications  {
  patientName: string
  medicationName: string
  pharmacyName: string
  transactionStatus: string
  notificationStatusDate: string
  transactionType: string
  notificationType:string
  notificationStatus:string
  userNotificationStatus:string
}

interface PharmacyNotificationsPayload {
  notificationStatusStartDate?: DateValue | null | string
  notificationStatusEndDate?: DateValue | null | string
  patientName?: string
  notificationType?: string
  notificationStatus?: string
}

interface PharmacyNotificationsResponseList {
  pharmacyNotifications: PharmacyNotifications[]
  total: number
}

export type {
  PharmacyNotifications,
  PharmacyNotificationsPayload,
  PharmacyNotificationsResponseList
}
