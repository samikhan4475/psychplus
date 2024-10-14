'use client'

import { TabContentHeading } from '@/components'
import { HistoryWidget } from './history-widget'

const TAB_TITLE = 'History'

const History = () => {
  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <HistoryWidget />
    </>
  )
}

export { History }
