'use client'

import { AddressTextField } from '@/components'

const ZipLast4Input = () => {
  return (
    <AddressTextField
      label="Area Code"
      field="contactDetails.addresses.0.zipLast4"
      placeholder="Area code"
      type="number"
      maxLength={4}
      labelClassName="!text-1"
    />
  )
}

export { ZipLast4Input }
