import { AddressFieldsGroup, YesNoSelect } from '@/components'
import { Box, Flex, Text } from '@radix-ui/themes'

const PrimaryAddressGroup = () => {
  
  return (
    <Box>
      <Flex align="center" justify="between">
        <Text size="2" className='font-[590px]' weight="medium">Primary Address</Text>
        <Box className="bg-pp-bg-accent col-span-8 flex gap-1 px-2">
          <Text className="mr-3 text-[12px] font-[600] leading-4">
            Is your address same as your organization?
          </Text>
          <YesNoSelect label='' field="isMailingAddressSameAsOrganization" className='mt-1' />
        </Box>
      </Flex>
      <AddressFieldsGroup
        prefix="primaryAddress"
        addressFieldName="street1"
        columnsPerRow='1'
      />
    </Box>
  )
}

export { PrimaryAddressGroup }

