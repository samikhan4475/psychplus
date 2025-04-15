import React from 'react'
import { Controller, Control } from 'react-hook-form'
import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { SelectOptionType } from '@/types'

interface ServiceLevelCheckboxProps {
  option: SelectOptionType
  control: Control<{ serviceLevelTypes: string[] }>
  index: number
}

export const ServiceLevelCheckbox: React.FC<ServiceLevelCheckboxProps> = ({
  option,
  control,
  index,
}) => (
  <Controller
    control={control}
    name="serviceLevelTypes"
    render={({ field }) => {
      const isChecked = field.value.includes(option.value)

      const toggleValue = () => {
        field.onChange(
          isChecked
            ? field.value.filter((val: string) => val !== option.value)
            : [...field.value, option.value],
        )
      }

      return (
        <Flex align="center" gap="2">
        <Checkbox
          id={`service-${index}`}
          checked={isChecked}
          onCheckedChange={toggleValue}
        />
        <Text
          size="1"
          as="label"
          htmlFor={`service-${index}`}
          className="cursor-pointer"
        >
          {option.label}
        </Text>
      </Flex>
      
      )
    }}
  />
)
