'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup, CheckboxInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PayerAddressFields = () => {
  const form = useFormContext()

  const onChange = (value: boolean) => {
    const fields = ['street1', 'street2', 'city', 'state', 'postalCode']
    const formValues = ['address1', 'address2', 'city', 'state', 'zip']

    fields.forEach((field, index) => {
      const formValue = value ? form.getValues(formValues[index]) : ''
      form.setValue(`practicePaymentAddress.${field}`, formValue, {
        shouldValidate: false,
      })
    })
  }

  return (
    <FormFieldContainer className="flex-1 pt-2">
      <Flex className="flex-row items-center justify-between">
        <Box>
          <FormFieldLabel className="pb-2 text-[14px]">
            <Text>Payer Address</Text>
          </FormFieldLabel>
        </Box>
        <Box className="bg-pp-bg-accent right-0 flex gap-2 rounded-4 px-2 py-1">
          <CheckboxInput
            field="sameAsPrimaryAddress"
            className="mt-[3px]"
            onCheckedChange={onChange}
            defaultChecked
          />
          <Text className="text-[12px] font-[600] leading-4">
            Is your address same as your Primary?
          </Text>
        </Box>
      </Flex>
      <AddressFieldsGroup
        columnsPerRow="2"
        className="flex gap-4"
        addressFieldName="street1"
        prefix="practicePaymentAddress"
      />
    </FormFieldContainer>
  )
}

export { PayerAddressFields }
