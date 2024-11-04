'use client'

import { AddressTextField } from '@/components'

const ZipInput = () => {
  return (
    <AddressTextField
      label="Zip"
      field="contactDetails.addresses.0.postalCode"
      placeholder="Zip"
      type="number"
      maxLength={5}
      labelClassName="!text-1"
      required
    />
  )
}

export { ZipInput }
