'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup, CheckboxInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'
import { PatientAddress } from '@/types'

interface PrimaryAddressFieldsProps {
  organizationAddress?: PatientAddress
}

const PrimaryAddressFields = ({
  organizationAddress,
}: PrimaryAddressFieldsProps) => {
  const form = useFormContext()
  const onChange = (value: boolean) => {
    const fields: (keyof PatientAddress)[] = [
      'street1',
      'street2',
      'city',
      'state',
      'postalCode',
    ]
    const formFields = ['address1', 'address2', 'city', 'state', 'zip']

    formFields.forEach((field, index) => {
      const organizationField = fields[index]
      const valueToSet =
        value && organizationAddress
          ? organizationAddress[organizationField] || ''
          : ''
      form.setValue(field, valueToSet)
    })
  }

  return (
    <FormFieldContainer className="flex-1 pt-2">
      <Flex className="flex-row items-center justify-between">
        <Box>
          <FormFieldLabel className="pb-2 text-[14px]">
            <Text>Primary Address</Text>
          </FormFieldLabel>
        </Box>
        <Box className="bg-pp-bg-accent right-0 flex gap-2 rounded-4 px-2 py-1">
          <CheckboxInput
            field="sameAsOrganizationAddress"
            className="mt-[3px]"
            onCheckedChange={onChange}
            defaultChecked
          />
          <Text className="text-[12px] font-[600] leading-4">
            Is your address same as your organization?
          </Text>
        </Box>
      </Flex>
      <AddressFieldsGroup columnsPerRow="2" className="flex gap-4" />
    </FormFieldContainer>
  )
}

export { PrimaryAddressFields }
