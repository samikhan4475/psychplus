'use client'

import { Flex } from '@radix-ui/themes'
import { CityInput } from './city-input'
import { PostalCodeInput } from './postal-code-input'
import { StateSelect } from './state-select'
import { StreetAddressInput } from './street-address-input'
import { StreetAddress2Input } from './street-address2-input'
import { ZipLast4Input } from './zip-last4-input'

const AddressDetails = () => {
  return (
    <>
      <StreetAddressInput />
      <StreetAddress2Input />
      <CityInput />
      <Flex gap="2">
        <StateSelect />
        <PostalCodeInput />
        <ZipLast4Input />
      </Flex>
    </>
  )
}

export { AddressDetails }
