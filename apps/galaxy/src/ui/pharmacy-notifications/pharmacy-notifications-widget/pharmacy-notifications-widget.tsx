'use client'

import { Flex } from '@radix-ui/themes'
import { PharmacyNotificationsFilterForm } from './pharmacy-notifications-filter-form'
import { PharmacyNotificationHeader } from './pharmacy-notifications-header'
import { PharmacyNotificationsTable } from './pharmacy-notifications-table'
import { PharmacyNotificationViewPagination } from './pharmacy-notifications-table-pagination'

const PharmacyNotificationWidget = () => {
  return (
    <Flex
      direction="column"
      width="100%"
      className="bg-white min-h-[calc(100dvh_-_278px)] rounded-1 shadow-2"
    >
      <PharmacyNotificationHeader />
      <PharmacyNotificationsFilterForm />
      <PharmacyNotificationsTable />
      <PharmacyNotificationViewPagination />
    </Flex>
  )
}

export { PharmacyNotificationWidget }
