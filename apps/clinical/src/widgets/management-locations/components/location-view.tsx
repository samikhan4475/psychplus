'use client'

import React from 'react'
import { Button, Flex, Heading } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_MANAGEMENT_LOCATIONS_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { LocationListTable } from './location-list-table'

const LocationView = () => {
  const { publish } = usePubsub()
  return (
    <>
      <Flex
        align={'center'}
        justify={'between'}
        p={'2'}
        className="mb-[1px] bg-[#fff] p-3 shadow-1"
      >
        <Heading size={'6'}>Location</Heading>
        <Button
          className="bg-[#151B4A]"
          size={'2'}
          onClick={() => {
            publish(`${ADD_MANAGEMENT_LOCATIONS_WIDGET}:${EventType.Opened}`)
          }}
        >
          <Plus color="#fff" size={16} />
          Add Location
        </Button>
      </Flex>
      <LocationListTable />
    </>
  )
}

export { LocationView }
