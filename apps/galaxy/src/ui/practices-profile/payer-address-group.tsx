import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { AddressFieldsGroup, YesNoSelect } from '@/components'

const PayerAddressGroup = () => {
  const form = useFormContext()
  const isDisabled = form.watch('isMailingAddressSameAsPrimary') === 'yes'

  const onChange = (value: string) => {
    form.setValue('isMailingAddressSameAsPrimary', value)
    const yesChecked = value === 'yes'
    const fields = [
      'street1',
      'street2',
      'city',
      'state',
      'postalCode',
      'zipLast4',
    ]
    const primaryFormFields = [
      'address1',
      'address2',
      'city',
      'state',
      'zip',
      'zipLast4',
    ]

    fields.forEach((field, index) => {
      const formValue = yesChecked
        ? form.getValues(primaryFormFields[index])
        : ''
      form.setValue(`payer.${field}`, formValue, {
        shouldValidate: false,
      })
    })
  }
  return (
    <Box>
      <Flex align="center" justify="between">
        <Text size="2" className="font-[590px]" weight="medium">
          Payer Address
        </Text>
        <Box className="bg-pp-bg-accent col-span-8 flex gap-1 px-2">
          <Text className="mr-3 text-[12px] font-[600] leading-4">
            Is your address same as Primary?
          </Text>
          <YesNoSelect
            label=""
            field="isMailingAddressSameAsPrimary"
            className="mt-1"
            onChange={onChange}
          />
        </Box>
      </Flex>
      <AddressFieldsGroup
        prefix="payer"
        addressFieldName="street1"
        columnsPerRow="1"
        disabled={isDisabled}
      />
    </Box>
  )
}

export { PayerAddressGroup }
