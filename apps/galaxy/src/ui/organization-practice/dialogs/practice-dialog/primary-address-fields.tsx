'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { AddressFieldsGroup, CheckboxInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PrimaryAddressFields = () => {
  return (
    <FormFieldContainer className="flex-1 pt-2">
      <Flex className="flex-row items-center justify-between">
        <Box>
          <FormFieldLabel className="pb-2 text-[14px]">
            <Text>Address</Text>
          </FormFieldLabel>
        </Box>
        <Box className="bg-pp-bg-accent right-0 flex gap-2 rounded-4 px-2 py-1">
          <CheckboxInput field="injection" className="mt-[3px]" />
          <Text className="text-[12px] font-[600] leading-4">
            Is your address same as your organization?
          </Text>
        </Box>
      </Flex>
      <AddressFieldsGroup
        columnsPerRow="2"
        className="flex gap-4"
        prefix="primary_"
      />
    </FormFieldContainer>
  )
}

export { PrimaryAddressFields }
