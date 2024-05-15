import { withSuspense } from '@psychplus-v2/utils'
import { Skeleton } from '@radix-ui/themes'
import type { Activity } from '../../types'
import { NotificationsMenu as Client } from './notifications-menu'

const NOW = new Date()

const THIRTY_SECONDS_AGO = new Date(NOW.getTime() - 30 * 1000)

const THREE_DAYS_AGO = new Date(NOW)
THREE_DAYS_AGO.setDate(NOW.getDate() - 3)

const FIVE_DAYS_AGO = new Date(NOW)
FIVE_DAYS_AGO.setDate(NOW.getDate() - 5)

const ONE_WEEK_AGO = new Date(NOW)
ONE_WEEK_AGO.setDate(NOW.getDate() - 7)

const FOUR_MONTHS_AGO = new Date(NOW)
FOUR_MONTHS_AGO.setMonth(NOW.getMonth() - 4)

const data: Activity[] = [
  {
    id: '1',
    type: 'new-message',
    datetime: THIRTY_SECONDS_AGO.toUTCString(),
    metadata: {
      from: 'Petra Kelsey',
    },
  },
  {
    id: '2',
    type: 'new-rx',
    datetime: THREE_DAYS_AGO.toUTCString(),
    metadata: {
      name: 'Lorazepam',
    },
  },
  {
    id: '3',
    type: 'new-lab-results',
    datetime: FIVE_DAYS_AGO.toUTCString(),
  },
  {
    id: '4',
    type: 'new-visit-notes',
    datetime: ONE_WEEK_AGO.toUTCString(),
    metadata: {
      provider: 'Petra Kelsey',
      date: 'Feb 15',
    },
  },

  {
    id: '5',
    type: 'new-message',
    datetime: FOUR_MONTHS_AGO.toUTCString(),
    metadata: {
      from: 'Kristin Watson',
    },
  },
]

const fetchNotifications = () =>
  new Promise<Activity[]>((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })

const NotificationsMenuServer = async () => {
  const data = await fetchNotifications()

  return <Client data={data} />
}

const NotificationsMenu = withSuspense(NotificationsMenuServer, {
  fallback: <Skeleton className="rounded-full h-[50px] w-[50px]" />,
})

export { NotificationsMenu }
