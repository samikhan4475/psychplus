import React, { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { MailingRadioButton } from './mailing-radio-button'
import { SchemaType } from './schema'
import { TabContentHeading } from './tab-content-heading'

const MailingAddressGroup = () => {
  const { watch, resetField } = useFormContext<SchemaType>()
  const isMailingAddressSameAsPrimary = watch('isMailingAddressSameAsPrimary')
  const addresses = watch('addresses')

  const {
    city,
    country,
    postalCode,
    state,
    street1,
    street2,
    type,
    timeZoneId,
  } = addresses[0]

  useEffect(() => {
    if (isMailingAddressSameAsPrimary)
      resetField('addresses.1', {
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
    <Box>
      <TabContentHeading title="Mailing Address">
        <MailingRadioButton />
      </TabContentHeading>
      <AddressFieldsGroup
        disabled={isMailingAddressSameAsPrimary}
        prefix="addresses.1"
        addressFieldName="street1"
        columnsPerRow="1"
      />
    </Box>
  )
}

export { MailingAddressGroup }
