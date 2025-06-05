'use client'

import React, { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { SchemaType } from '../preferred-partner/dialogs/add-preferred-partner/schema'

const BillingAddressGroup = () => {
  const { control, resetField } = useFormContext<SchemaType>()
  const isMailingAddressSameAsPrimary = useWatch({
    control,
    name: 'isMailingAddressSameAsPrimary',
  })
  const mailingAddress = useWatch({
    control,
    name: 'contactDetails.addresses.1',
  })

  const primaryAddress = useWatch({
    control,
    name: 'contactDetails.addresses.0',
  })


  useEffect(() => {
    if (isMailingAddressSameAsPrimary !== 'yes' || !primaryAddress) return

    const updatedMailing = {
      ...primaryAddress,
      type: 'Billing',
    }   
     const addresses = [primaryAddress, updatedMailing]

    const areSame =
      JSON.stringify(updatedMailing) === JSON.stringify(mailingAddress)

    if (!areSame) {
      resetField('contactDetails.addresses', { defaultValue: addresses })
    }
  }, [isMailingAddressSameAsPrimary, primaryAddress, mailingAddress, resetField])
  return (
    <AddressFieldsGroup
      disabled={isMailingAddressSameAsPrimary === 'yes'}
      prefix="contactDetails.addresses.1"
      addressFieldName="street1"
    />
  )
}

export { BillingAddressGroup }
