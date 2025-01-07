'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { ProviderCodingFilters } from './provider-coding-filters'
import { ProviderCodingTableView } from './provider-coding-table-view'
import { useStore } from './store'
import { getLocalTimeZone, startOfWeek, today } from '@internationalized/date'
import { START_OF_WEEK_LOCALE } from '../constants'

const ProviderCoding = () => {
  const { loading, setDates } = useStore((state) => ({
    loading: state.loading,
    setDates: state.setDates,
  }))

  useEffect(() => {
    const timeZone = getLocalTimeZone()
    const currentDate = today(timeZone)
    const weekStartDateValue = startOfWeek(currentDate, START_OF_WEEK_LOCALE)
    setDates(weekStartDateValue.toDate(timeZone))
  }, [])

  return (
    <Flex direction="column" className="h-full !overflow-hidden">
      <ProviderCodingFilters />
      {loading ? <LoadingPlaceholder /> : <ProviderCodingTableView />}
    </Flex>
  )
}

export { ProviderCoding }
