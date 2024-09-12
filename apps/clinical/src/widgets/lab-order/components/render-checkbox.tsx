import React from 'react'
import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes'
import { CheckBoxType } from '../types'

const CustomCheckbox = ({ label, onChange, checked }: CheckBoxType) => {
  return (
    <Box height="100%">
      <Flex direction="column" height="100%" gap="1">
        <Text size="1" weight="medium" className=" mt-1">
          {label}
        </Text>
        <Flex gap="2">
          <RadioGroup.Root
            defaultValue={'no'}
            size="1"
            value={checked}
            color="indigo"
            highContrast
            onValueChange={(value) => {
              onChange(value)
            }}
          >
            <Flex gap="2">
              <Text as="label" size="3">
                <Flex gap="1">
                  <RadioGroup.Item className="text-[#151B4A]" value="yes" />
                  Yes
                </Flex>
              </Text>
              <Text as="label" size="3">
                <Flex gap="1">
                  <RadioGroup.Item className="text-[#151B4A]" value="no" />
                  No
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
        </Flex>
      </Flex>
    </Box>
  )
}

export { CustomCheckbox }
