'use client'

import { useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup, YesNoSelect } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const MailingAddressFields = () => {
  const form = useFormContext()
  const [sameMailingAddress, setSameMailingAddress] = useState('no')

  const onYesNoChange = (value: string) => {
    setSameMailingAddress(value)
    const fields = ['street1', 'street2', 'city', 'state', 'postalCode']
    const formValues = ['address1', 'address2', 'city', 'state', 'zip']

    fields.forEach((field, index) => {
      const formValue = value === 'yes' ? form.getValues(formValues[index]) : ''
      form.setValue(`mailing.${field}`, formValue, {
        shouldValidate: true,
      })
    })
  }

  return (
    <FormFieldContainer className="flex-1 pt-2">
      <Flex className="flex-row items-center justify-between">
        <Box>
          <FormFieldLabel className="pb-2 text-[14px]">
            <Text>Mailing Address</Text>
          </FormFieldLabel>
        </Box>
        <Box className="bg-pp-bg-accent right-0 flex gap-2 rounded-4 px-2 py-1">
          <Text className="text-[12px] font-[600] leading-4">
            Is your mailing address same as Home?
          </Text>
          <YesNoSelect
            label=""
            field="isMailingAddressSameAsHome"
            className="mt-1"
            onChange={onYesNoChange}
            isNoFirst
            defaultValue={sameMailingAddress}
          />
        </Box>
      </Flex>
      <AddressFieldsGroup
        columnsPerRow="2"
        className="flex gap-4"
        required
        prefix="mailing"
        addressFieldName="street1"
      />
    </FormFieldContainer>
  )
}

export { MailingAddressFields }
