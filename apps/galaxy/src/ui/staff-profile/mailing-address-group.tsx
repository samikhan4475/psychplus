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

  useEffect(() => {
    if (isMailingAddressSameAsPrimary)
      resetField('addresses.1', {
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
    <Box>
      <TabContentHeading title="Mailing Address">
        <MailingRadioButton />
      </TabContentHeading>
      <AddressFieldsGroup
        disabled={isMailingAddressSameAsPrimary}
        prefix="addresses.1"
        addressFieldName="street1"
      />
    </Box>
  )
}

export { MailingAddressGroup }
