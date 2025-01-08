'use client'

import { Flex, Text } from '@radix-ui/themes'
import { AddLocationButton } from './add-location-button'

interface LocationHeaderProps {
  googleApiKey: string
}

const LocationHeader = ({ googleApiKey }: LocationHeaderProps) => {
  return (
    <Flex align="center" justify="between" className="bg-white p-2 shadow-2">
      <Text size="3" weight="bold">
        Location
      </Text>
      <AddLocationButton googleApiKey={googleApiKey} />
    </Flex>
  )
}

export { LocationHeader }
