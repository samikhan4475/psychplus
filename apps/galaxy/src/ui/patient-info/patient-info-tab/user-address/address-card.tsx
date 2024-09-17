'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { MailAddressGroup } from './mail-address-group'
import { PrimaryAddressGroup } from './primary-address-group'

interface AddressCardProps {
  googleApiKey: string
}

const AddressCard = ({ googleApiKey }: AddressCardProps) => {
  return (
    <Flex direction="column" className="bg-white rounded-1">
      <CardHeading title="Address" />
      <Flex px="2" py="2" gap="2">
        <GooglePlacesContextProvider apiKey={googleApiKey}>
          <PrimaryAddressGroup />
          <MailAddressGroup />
        </GooglePlacesContextProvider>
      </Flex>
    </Flex>
  )
}

export { AddressCard }
