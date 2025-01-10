'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { FormSwitch } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const EhrPartnerField = () => {
  return (
    <FormFieldContainer className="mt-[18px] flex-1 gap-0">
      <Flex className="flex-row items-center justify-between">
        <Box className="bg-pp-bg-accent right-0 flex h-6 w-full gap-2 rounded-2 px-2 py-1">
          <FormFieldLabel required>EHR Partner</FormFieldLabel>
          <FormSwitch field="ehrPartner" color="blue" />
          <Text size="2">Yes</Text>
        </Box>
      </Flex>
      <FormFieldError name="ehrPartner" />
    </FormFieldContainer>
  )
}

export { EhrPartnerField }
