'use client'

import { Flex } from '@radix-ui/themes'
import { AddPatient } from '../add-patient-dialog'

interface SmartFiltersProps {
  googleApiKey: string
}
const SmartFilters = ({ googleApiKey }: SmartFiltersProps) => {
  return (
    <Flex justify="end" flexGrow="1" gap="2">
      <AddPatient googleApiKey={googleApiKey} />
    </Flex>
  )
}

export { SmartFilters }
