import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { MailingRadioButton } from './mailing-radio-button'
import { SchemaType } from './schema'
import { TabContentHeading } from './tab-content-heading'

const MailingAddressGroup = () => {
  const { watch, resetField } = useFormContext<SchemaType>()
  const isMailingAddressSameAsPrimary = watch(
    'contactInfo.isMailingAddressSameAsPrimary',
  )

  useEffect(() => {
    resetField('contactInfo.addresses.1', {
      defaultValue: {
        postalCode: '',
        type: 'Mailing',
        street1: '',
        street2: '',
        city: '',
        state: '',
        country: '',
        timeZoneId: '',
      },
    })
  }, [isMailingAddressSameAsPrimary, resetField])

  return (
    <>
      <TabContentHeading title="Mailing Address">
        <MailingRadioButton />
      </TabContentHeading>
      <AddressFieldsGroup
        disabled={isMailingAddressSameAsPrimary}
        prefix="contactInfo.addresses.1"
        addressFieldName="street1"
      />
    </>
  )
}

export { MailingAddressGroup }
