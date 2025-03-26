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
  const contactInfo = watch('contactInfo')

  const {
    city,
    country,
    postalCode,
    state,
    street1,
    street2,
    type,
    timeZoneId,
  } = contactInfo.addresses[0]

  useEffect(() => {
    resetField('contactInfo.addresses.1', {
      defaultValue: {
        postalCode: isMailingAddressSameAsPrimary ? postalCode : '',
        type: 'Mailing',
        street1: isMailingAddressSameAsPrimary ? street1 : '',
        street2: isMailingAddressSameAsPrimary ? street2 : '',
        city: isMailingAddressSameAsPrimary ? city : '',
        state: isMailingAddressSameAsPrimary ? state : '',
        country: isMailingAddressSameAsPrimary ? country : '',
        timeZoneId: isMailingAddressSameAsPrimary ? timeZoneId : '',
      },
    })
  }, [
    isMailingAddressSameAsPrimary,
    city,
    country,
    postalCode,
    state,
    street1,
    street2,
    type,
    timeZoneId,
    resetField,
  ])

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
