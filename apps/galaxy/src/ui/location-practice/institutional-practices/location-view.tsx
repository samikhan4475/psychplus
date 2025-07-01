'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LocationPracticeTab } from '../types'
import { FilterForm } from './filter-form'
import { LocationTable } from './location-table'
import { useStore } from './store'

const InstitutionalView = () => {
  const { id: locationId } = useParams<{ id: string }>()
  const { fetchLocations, setData } = useStore((state) => ({
    fetchLocations: state.fetchLocations,
    setData: state.setData,
  }))

  useEffect(() => {
    setData([])
    fetchLocations({
      locationId,
      practiceType: LocationPracticeTab.Institutional,
    })
  }, [fetchLocations])

  return (
    <Flex direction="column" gap="1" p="1px" height="100%">
      <FilterForm practiceType={LocationPracticeTab.Institutional} />
      <Flex
        direction="column"
        height="100%"
        className="bg-white h-[calc(100dvh-308px)] rounded-1 shadow-2"
      >
        <LocationTable />
      </Flex>
    </Flex>
  )
}

export { InstitutionalView }
