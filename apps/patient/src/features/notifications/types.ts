interface NotificationItem {
  id: string
  userId: number
  readOn?: string
  alternateProcessedOn?: string
  createdOn: string
  destination?: string
  purposeCode: string
  sourceCode?: string
  title: string
  message: string
}

interface NotificationResponse {
  notificationList: NotificationItem[]
}

export { type NotificationResponse, type NotificationItem }
