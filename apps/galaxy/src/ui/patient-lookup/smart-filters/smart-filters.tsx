'use client'

import { Flex } from '@radix-ui/themes'
import { AddPatient } from '../add-patient-dialog'

const SmartFilters = () => {
  return (
    <Flex justify="end" flexGrow="1" gap="2">
      <AddPatient />
    </Flex>
  )
}

export { SmartFilters }
