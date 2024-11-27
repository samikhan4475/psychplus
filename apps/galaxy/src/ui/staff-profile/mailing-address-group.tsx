import React, { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
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
    if (isMailingAddressSameAsPrimary) {
      resetField('contactInfo.addresses.1', {
        defaultValue: {
          postalCode: '',
          type: 'Mailing',
          street1: '',
          street2: '',
          city: '',
          state: '',
          country: '',
        },
      })
    }
  }, [isMailingAddressSameAsPrimary, resetField])

  return (
    <Flex direction="column">
      <TabContentHeading title="Mailing">
        <MailingRadioButton />
      </TabContentHeading>
      <AddressFieldsGroup
        disabled={isMailingAddressSameAsPrimary}
        prefix="contactInfo.addresses.1"
        addressFieldName="street1"
      />
    </Flex>
  )
}

export { MailingAddressGroup }
