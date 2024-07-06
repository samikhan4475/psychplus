'use client'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'

interface RadioGroupInputProps {
  title: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
}

interface RadioOption {
  value: string
  label: string
  description?: string
}

const RadioGroupInput = ({
  title,
  options,
  value,
  onChange,
}: RadioGroupInputProps) => {
  return (
    <Flex direction="column" gap="4">
      <Text
        weight="medium"
        className="text-[15px] text-accent-12 sm:text-[18px]"
      >
        {title}
      </Text>
      <RadioGroup.Root value={value} onValueChange={onChange}>
        <Flex
          direction={{ initial: 'column', sm: 'row' }}
          justify="start"
          align={{ initial: 'stretch', sm: 'start' }}
          gap="3"
        >
          {options.map((option) => (
            <RadioGroup.Item
              key={option.value}
              value={option.value}
              className="data-[state=checked]:text-white whitespace-nowrap rounded-item bg-gray-3 px-4 py-3 font-[600] text-accent-12 data-[state=checked]:bg-accent-12 xs:min-w-[145px]"
            >
              <Flex
                align="center"
                justify="center"
                direction={{ initial: 'column', xs: 'row' }}
              >
                <Text size="2">{option.label}</Text>
                {option.description ? (
                  <Text className="text-[13px]">
                    &nbsp;{`(${option.description})`}
                  </Text>
                ) : null}
              </Flex>
            </RadioGroup.Item>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Flex>
  )
}

export { RadioGroupInput }
