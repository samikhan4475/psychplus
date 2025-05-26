'use client'

import React, { useEffect } from 'react'
import { Box } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components'
import { MailingRadioButton } from './mailing-radio-button'
import { SchemaType } from './schema'
import { TabContentHeading } from './tab-content-heading'

const MailingAddressGroup = () => {
  const { control, resetField } = useFormContext<SchemaType>()
  const [homeAddress, isMailingAddressSameAsPrimary] = useWatch({
    control,
    name: ['homeAddress', 'contactInfo.isMailingAddressSameAsPrimary'],
  })

  useEffect(() => {
    if (isMailingAddressSameAsPrimary) {
      resetField('mailingAddress', {
        defaultValue: {
          postalCode: homeAddress?.postalCode ?? '',
          zipLast4: homeAddress?.zipLast4 ?? '',
          type: 'Mailing',
          street1: homeAddress?.street1 ?? '',
          street2: homeAddress?.street2 ?? '',
          city: homeAddress?.city ?? '',
          state: homeAddress?.state ?? '',
          country: homeAddress?.country ?? '',
          timeZoneId: homeAddress?.timeZoneId ?? '',
        },
      })
    }
  }, [isMailingAddressSameAsPrimary, homeAddress, resetField])

  return (
    <Box>
      <TabContentHeading title="Mailing Address">
        <MailingRadioButton />
      </TabContentHeading>
      <AddressFieldsGroup
        disabled={isMailingAddressSameAsPrimary}
        prefix="mailingAddress"
        addressFieldName="street1"
      />
    </Box>
  )
}

export { MailingAddressGroup }
