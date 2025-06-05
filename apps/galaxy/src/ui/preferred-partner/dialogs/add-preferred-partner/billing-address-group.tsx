'use client'

import React, { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { SchemaType } from './schema'

const BillingAddressGroup = () => {
  const { control, resetField } = useFormContext<SchemaType>()
  const isMailingAddressSameAsPrimary = useWatch({
    control,
    name: 'isMailingAddressSameAsPrimary',
  })

  const primaryAddress = useWatch({
    control,
    name: 'contactDetails.addresses.0',
  })
  const billingAddress = useWatch({
    control,
    name: 'contactDetails.addresses.1',
  })

  useEffect(() => {
    if (isMailingAddressSameAsPrimary !== 'yes' || !primaryAddress) return

    const updatedBilling = {
      ...primaryAddress,
      type: 'Billing',
    }
    const addresses = [primaryAddress, updatedBilling]

    const areSame =
      JSON.stringify(updatedBilling) === JSON.stringify(billingAddress)

    if (!areSame) {
      resetField('contactDetails.addresses', { defaultValue: addresses })
    }
  }, [
    isMailingAddressSameAsPrimary,
    primaryAddress,
    billingAddress,
    resetField,
  ])
  return (
    <AddressFieldsGroup
      disabled={isMailingAddressSameAsPrimary === 'yes'}
      prefix="contactDetails.addresses.1"
      addressFieldName="street1"
    />
  )
}

export { BillingAddressGroup }
