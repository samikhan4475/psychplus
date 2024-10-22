'use client'

import { Flex, Heading } from '@radix-ui/themes'
import { SmartFilters } from './smart-filters'

const PatientLookupHeader = () => {
  return (
    <Flex py="2" px="4" className="bg-white z-[1]" position="sticky" top="0">
      <Heading size="5">Patient Lookup</Heading>
      <SmartFilters />
    </Flex>
  )
}

export { PatientLookupHeader }
