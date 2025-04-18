'use client'

import React, { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { MailingRadioButton } from './mailing-radio-button'
import { SchemaType } from './schema'
import { TabContentHeading } from './tab-content-heading'

const MailingAddressGroup = () => {
  const { resetField, control } = useFormContext<SchemaType>()
  const [homeAddress, isMailingAddressSameAsPrimary] = useWatch({
    control,
    name: ['homeAddress', 'contactInfo.isMailingAddressSameAsPrimary'],
  })

  useEffect(() => {
    resetField('mailingAddress', {
      defaultValue: {
        postalCode: isMailingAddressSameAsPrimary
          ? homeAddress?.postalCode ?? ''
          : '',
        type: 'Mailing',
        street1: isMailingAddressSameAsPrimary
          ? homeAddress?.street1 ?? ''
          : '',
        street2: isMailingAddressSameAsPrimary
          ? homeAddress?.street2 ?? ''
          : '',
        city: isMailingAddressSameAsPrimary ? homeAddress?.city ?? '' : '',
        state: isMailingAddressSameAsPrimary ? homeAddress?.state ?? '' : '',
        country: isMailingAddressSameAsPrimary
          ? homeAddress?.country ?? ''
          : '',
        timeZoneId: isMailingAddressSameAsPrimary
          ? homeAddress?.timeZoneId ?? ''
          : '',
      },
    })
  }, [isMailingAddressSameAsPrimary, homeAddress, resetField])

  return (
    <>
      <TabContentHeading title="Mailing Address">
        <MailingRadioButton />
      </TabContentHeading>
      <AddressFieldsGroup
        disabled={isMailingAddressSameAsPrimary}
        prefix="mailingAddress"
        addressFieldName="street1"
      />
    </>
  )
}

export { MailingAddressGroup }
