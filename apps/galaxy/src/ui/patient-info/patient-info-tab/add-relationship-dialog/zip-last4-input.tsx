'use client'

import { AddressTextField } from '@/components'

const ZipLast4Input = () => {
  return (
    <AddressTextField
      label="Postal+4"
      field="contactDetails.addresses.0.postalPlus4Code"
      placeholder="Postal+4"
      type="number"
      maxLength={4}
      labelClassName="!text-1"
    />
  )
}

export { ZipLast4Input }
