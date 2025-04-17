import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup, YesNoSelect } from '@/components'
import { PatientAddress } from '@/types'

interface PrimaryAddressFieldsProps {
  organizationAddress?: PatientAddress
}

const PrimaryAddressGroup = ({
  organizationAddress,
}: PrimaryAddressFieldsProps) => {
  const form = useFormContext()
  const onChange = (value: string) => {
    const yesChecked = value === 'yes'
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
        yesChecked && organizationAddress
          ? organizationAddress[organizationField] || ''
          : ''
      form.setValue(field, valueToSet)
    })
  }

  return (
    <Box>
      <Flex align="center" justify="between">
        <Text size="2" className="font-[590px]" weight="medium">
          Primary Address
        </Text>
        <Box className="bg-pp-bg-accent col-span-8 flex gap-1 px-2">
          <Text className="mr-3 text-[12px] font-[600] leading-4">
            Is your address same as your organization?
          </Text>
          <YesNoSelect
            label=""
            field="isMailingAddressSameAsOrganization"
            className="mt-1"
            onChange={onChange}
          />
        </Box>
      </Flex>
      <AddressFieldsGroup
        prefix="payer"
        addressFieldName="street1"
        columnsPerRow="1"
      />
    </Box>
  )
}

export { PrimaryAddressGroup }
