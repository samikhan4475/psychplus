'use client'

import { Flex, RadioGroup, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { RadioButtonGroupProps } from '../types'

const RadioButtonGroup = ({ label, name, options }: RadioButtonGroupProps) => {
  const { watch, setValue } = useFormContext()


  return (
    <Flex gap="2" justify="start" align="center">
      <Text size="3" weight="medium">
        {label}
      </Text>
      <RadioGroup.Root
        size="2"
        color="indigo"
        highContrast
        value={watch(name)}
        onValueChange={(value) => setValue(name, value)}
      >
        <Flex gap="3" align="center">
          {options.map((option) => (
            <Text as="label" size="2" weight="regular" key={option.value}>
              <Flex
                className={radioButtonClass}
                justify="center"
                align="center"
                gap="1"
              >
                <RadioGroup.Item value={option.value} /> {option.label}
              </Flex>
            </Text>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Flex>
  )
}

const radioButtonClass =
  'rounded-2 border border-solid border-[#D9E2FC] bg-[#fff] pl-[5px] pr-[6px] py-[3px] text-[#60646C] [&:has(input:checked)]:text-[#fff] [&:has(input:checked)]:bg-[#194595]'

export { RadioButtonGroup }
