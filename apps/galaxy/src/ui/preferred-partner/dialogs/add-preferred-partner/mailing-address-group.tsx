'use client'

import React, { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { SchemaType } from './schema'

const MailingAddressGroup = () => {
  const { control, resetField } = useFormContext<SchemaType>()
  const isMailingAddressSameAsPrimary = useWatch({
    control,
    name: 'contactDetails.isMailingAddressSameAsPrimary',
  })

  const primaryAddress = useWatch({
    control,
    name: 'contactDetails.addresses.0',
  })

  const mailingAddress = useWatch({
    control,
    name: 'contactDetails.addresses.1',
  })

  useEffect(() => {
    if (!isMailingAddressSameAsPrimary || !primaryAddress) return

    const updatedMailing = {
      ...primaryAddress,
      type: 'Mailing',
    }
    const addresses = [primaryAddress, updatedMailing]

    const areSame =
      JSON.stringify(updatedMailing) === JSON.stringify(mailingAddress)

    if (!areSame) {
      resetField('contactDetails.addresses', { defaultValue: addresses })
    }
  }, [isMailingAddressSameAsPrimary, primaryAddress, mailingAddress])
  return (
    <AddressFieldsGroup
      disabled={isMailingAddressSameAsPrimary}
      prefix="contactDetails.addresses.1"
      addressFieldName="street1"
    />
  )
}

export { MailingAddressGroup }
