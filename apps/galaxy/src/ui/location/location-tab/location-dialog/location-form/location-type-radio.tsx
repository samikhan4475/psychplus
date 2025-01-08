'use client'

import { Flex, RadioGroup, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { LocationSchemaType } from './schema'

const LocationTypeRadio = () => {
  const form = useFormContext<LocationSchemaType>()
  const selectedValue = form.watch('locationType')
  return (
    <Flex gap="3" className="col-span-full" width="100%">
      <Text as="label" size="1" weight="medium">
        Location Type
      </Text>
      <RadioGroup.Root
        defaultValue={selectedValue}
        onValueChange={(value) => form.setValue('locationType', value)}
        name="locationType"
        size="1"
        className="flex-row gap-3"
        highContrast
      >
        {locationTypeOptions.map(({ label, value }, idx) => (
          <RadioGroup.Item
            value={value}
            key={`${idx}-${value}`}
            className={cn({
              'font-medium': selectedValue === value,
            })}
          >
            {label}
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </Flex>
  )
}

const locationTypeOptions = [
  { label: 'Clinic', value: 'Clinic' },
  { label: 'Facility', value: 'Facility' },
]

export { LocationTypeRadio }
