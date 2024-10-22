'use client'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { UnitSystem } from '../../constants'

const RadioButton = ({
  unitSystem,
  setUnitSystem,
}: {
  unitSystem: UnitSystem
  setUnitSystem: (value: UnitSystem) => void
}) => {
  return (
    <RadixRadioGroup.Root
      value={unitSystem}
      onValueChange={(newValue) => setUnitSystem(newValue as UnitSystem)}
      className="flex flex-row gap-3"
    >
      {[UnitSystem.Metric, UnitSystem.English].map((value) => {
        const isSelected = value === unitSystem

        return (
          <Flex key={value} align="center" asChild>
            <label className="flex cursor-pointer items-center gap-2">
              <RadixRadioGroup.Item
                id={value}
                value={value}
                className={cn(
                  'rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9',
                  isSelected && 'border-blue-11 bg-blue-11',
                )}
              >
                <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
              </RadixRadioGroup.Item>
              <Text
                size="2"
                className={cn(isSelected && 'font-medium', 'flex-1')}
              >
                {value}
              </Text>
            </label>
          </Flex>
        )
      })}
    </RadixRadioGroup.Root>
  )
}

export { RadioButton }
