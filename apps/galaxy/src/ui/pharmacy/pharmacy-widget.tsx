'use client'

import { Flex } from '@radix-ui/themes'
import { CurrentPharmaciesTable } from './current-pharmacies-table'
import { PharmacyHeader } from './pharmacy-header'

interface PharmacyWidgetProps {
  patientId: string
  scriptSureAppUrl: string
}

const PharmacyWidget = ({
  patientId,
  scriptSureAppUrl,
}: PharmacyWidgetProps) => {
  return (
    <Flex direction="column" width="100%" gap="1">
      <PharmacyHeader scriptSureAppUrl={scriptSureAppUrl} />
      <CurrentPharmaciesTable patientId={patientId} />
    </Flex>
  )
}

export { PharmacyWidget }
