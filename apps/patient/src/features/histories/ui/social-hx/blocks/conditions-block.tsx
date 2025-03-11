'use client'

import { Flex, Text } from '@radix-ui/themes'
import { SelectableChip } from '@/components-v2'
import SOCIAL_HX_BLOCK_OPTIONS from './social-hx-options.json'
import { useFormContext } from 'react-hook-form'

const ConditionsBlock = () => {
   const form = useFormContext()
  return (
    <Flex gap="2" wrap="wrap">
      {SOCIAL_HX_BLOCK_OPTIONS.map((option) => (
        <Flex
          gap="2"
          direction="column"
          key={option.heading}
          className="my-1 w-full"
        >
          <Text weight="medium" className="line-clamp-1 text-[16px]">
            {option.heading}
          </Text>
          <Flex gap="2" wrap="wrap">
            {option.options.map((condition) => (
              <SelectableChip
                key={condition.value}
                label={condition.label}
                selected={form.watch(option.field) === condition.value}
                onClick={() => {
                  form.clearErrors(option.field)
                  form.setValue(option.field, condition.value)
                }}
              />
            ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  )
}

export { ConditionsBlock }
