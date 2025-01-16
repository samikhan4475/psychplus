'use client'

import { useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup } from '@/components/'
import { PatientInfoSchemaType } from '../patient-info-schema'
import { MailAddressRadio } from './mail-address-radio'

const MailAddressGroup = () => {
  const { watch, resetField } = useFormContext<PatientInfoSchemaType>()
  const contactDetails = watch('contactDetails')

  const {
    homeAddress: { city, country, postalCode, state, street1, street2, type },
    isMailingAddressSameAsPrimary,
  } = contactDetails

  useEffect(() => {
    resetField('contactDetails.mailingAddress', {
      defaultValue: {
        postalCode: isMailingAddressSameAsPrimary ? postalCode : '',
        type: 'Mailing',
        street1: isMailingAddressSameAsPrimary ? street1 : '',
        street2: isMailingAddressSameAsPrimary ? street2 : '',
        city: isMailingAddressSameAsPrimary ? city : '',
        state: isMailingAddressSameAsPrimary ? state : '',
        country: isMailingAddressSameAsPrimary ? country : '',
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
    resetField,
  ])

  return (
    <Flex direction="column" className="bg-white flex-1">
      <Flex align="center" justify="between">
        <Text weight="medium" className="text-[14px]">
          Mail
        </Text>
        <MailAddressRadio />
      </Flex>
      <AddressFieldsGroup
        columnsPerRow="1"
        disabled={isMailingAddressSameAsPrimary ?? true}
        addressFieldName="street1"
        prefix="contactDetails.mailingAddress"
      />
    </Flex>
  )
}

export { MailAddressGroup }
