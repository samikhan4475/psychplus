'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FilterForm } from '../institutional-practices/filter-form'
import { LocationTable } from '../institutional-practices/location-table'
import { useStore } from '../institutional-practices/store'
import { LocationPracticeTab } from '../types'

const ProfessionalView = () => {
  const { id: locationId } = useParams<{ id: string }>()
  const { fetchLocations, setData } = useStore((state) => ({
    fetchLocations: state.fetchLocations,
    setData: state.setData,
  }))

  useEffect(() => {
    setData([])
    fetchLocations({
      locationId,
      practiceType: LocationPracticeTab.Professional,
    })
  }, [fetchLocations])

  return (
    <Flex direction="column" gap="1" p="1px" height="100%">
      <FilterForm practiceType={LocationPracticeTab.Professional} />
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

export { ProfessionalView }
