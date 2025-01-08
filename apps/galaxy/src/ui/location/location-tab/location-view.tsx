'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { FilterForm } from './filter-form'
import { LocationHeader } from './location-header'
import { LocationTable } from './location-table'
import { LocationTablePagination } from './location-table-pagination'
import { useStore } from './store'

interface LocationViewProps {
  googleApiKey: string
}
const LocationView = ({ googleApiKey }: LocationViewProps) => {
  const { fetchLocations } = useStore((state) => ({
    fetchLocations: state.fetchLocations,
    setData: state.setData,
    data: state.setData,
  }))

  useEffect(() => {
    fetchLocations()
  }, [fetchLocations])

  return (
    <Flex direction="column" gap="1" p="1px" height="100%">
      <LocationHeader googleApiKey={googleApiKey} />
      <FilterForm />
      <Flex
        direction="column"
        height="100%"
        className="bg-white h-[calc(100dvh-302px)] rounded-1 shadow-2"
      >
        <LocationTable googleApiKey={googleApiKey} />
        <LocationTablePagination />
      </Flex>
    </Flex>
  )
}

export { LocationView }
