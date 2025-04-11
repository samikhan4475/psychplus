'use server'

import { type ActionResult } from '@psychplus-v2/api'
import { NotificationItem, NotificationResponse } from '../types'

const dummyNotifications: NotificationItem[] = [
  {
    id: 'notification-1',
    userId: 0,
    createdOn: '2025-04-09T20:37:30.959Z',
    readOn: '2025-04-09T19:37:30.959Z',
    alternateProcessedOn: '2025-04-09T19:37:30.959Z',
    destination: 'All',
    purposeCode: 'Subscription',
    sourceCode: 'App',
    title: 'View Details',
    message:
      'Your order #1234 has been shipped and is on its way to your address.',
  },
  {
    id: 'notification-2',
    userId: 0,
    createdOn: '2025-04-09T19:37:30.959Z',
    readOn: '2025-04-09T19:37:30.959Z',
    alternateProcessedOn: '2025-04-09T19:37:30.959Z',
    destination: 'All',
    purposeCode: 'WeMissYou',
    sourceCode: 'App',
    title: 'Reply',
    message: 'You have a new message from Alex regarding your recent post.',
  },
  {
    id: 'notification-3',
    userId: 0,
    createdOn: '2025-04-09T19:37:30.959Z',
    readOn: '2025-04-09T19:37:30.959Z',
    alternateProcessedOn: '2025-04-09T19:37:30.959Z',
    destination: 'All',
    purposeCode: 'SubscriptionRenewed',
    sourceCode: 'App',
    title: 'Check Now',
    message:
      'A new version of the app is available. Update now to enjoy new features.',
  },
  {
    id: 'notification-4',
    userId: 0,
    createdOn: '2025-04-09T19:37:30.959Z',
    readOn: '2025-04-09T19:37:30.959Z',
    alternateProcessedOn: '2025-04-09T19:37:30.959Z',
    destination: 'All',
    purposeCode: 'AppointmentReminder',
    sourceCode: 'App',
    title: 'View Offer',
    message: 'Special discount just for you! Get 25% off your next purchase.',
  },
  {
    id: 'notification-5',
    userId: 0,
    createdOn: '2025-04-09T19:37:30.959Z',
    readOn: '2025-04-09T19:37:30.959Z',
    alternateProcessedOn: '2025-04-09T19:37:30.959Z',
    destination: 'All',
    purposeCode: 'TemplateMessage',
    sourceCode: 'App',
    title: 'No Button',
    message: 'Your weekly summary is ready. See what you’ve missed this week.',
  },
  {
    id: 'notification-6',
    userId: 0,
    createdOn: '2025-04-09T19:37:30.959Z',
    readOn: '2025-04-09T19:37:30.959Z',
    alternateProcessedOn: '2025-04-09T19:37:30.959Z',
    destination: 'All',
    purposeCode: 'SubscriptionCancel',
    sourceCode: 'App',
    title: 'Open',
    message:
      'Reminder: Your subscription will expire in 3 days. Renew to keep enjoying our services.',
  },
  {
    id: 'notification-7',
    userId: 0,
    createdOn: '2025-04-09T19:37:30.959Z',
    readOn: '2025-04-09T19:37:30.959Z',
    alternateProcessedOn: '2025-04-09T19:37:30.959Z',
    destination: 'All',
    purposeCode: 'Subscription',
    sourceCode: 'App',
    title: 'Open',
    message:
      'Reminder: Your subscription will expire in 3 days. Renew to keep enjoying our services.',
  },
]

const getNotificationsAction = async (): Promise<
  ActionResult<NotificationResponse>
> => {
  const result = {
    data: dummyNotifications,
  }

  return {
    state: 'success',
    data: {
      notificationList: result.data,
      total: 10,
    },
  }
}

export { getNotificationsAction }
