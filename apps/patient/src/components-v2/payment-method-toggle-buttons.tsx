'use client'

import { PaymentType } from '@psychplus-v2/constants'
import { cn } from '@psychplus-v2/utils'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Flex, Text } from '@radix-ui/themes'

const PaymentMethodToggleButtons = ({
  value,
  onChange,
  disableInsurance,
}: {
  value: PaymentType
  onChange: (value: PaymentType) => void
  disableInsurance: boolean
}) => (
  <ToggleGroup.Root
    type="single"
    value={value}
    onValueChange={(value) => {
      if (value) onChange(value as PaymentType)
    }}
  >
    <Flex className="flex-wrap" gap="4">
      {[PaymentType.Insurance, PaymentType.SelfPay].map((option) => (
        <ToggleGroup.Item
          key={option}
          value={option}
          className={cn(
            toggleGroupItemClasses,
            option === PaymentType.Insurance &&
              disableInsurance &&
              disabledClasses,
          )}
          disabled={option === PaymentType.Insurance && disableInsurance}
        >
          <Text weight="medium">{option}</Text>
        </ToggleGroup.Item>
      ))}
    </Flex>
  </ToggleGroup.Root>
)

const toggleGroupItemClasses =
  'w-[120px] h-[48px] rounded-6 border border-[#24366B] text-3 data-[state=on]:bg-[#24366B] data-[state=on]:text-[white]'
const disabledClasses = 'cursor-not-allowed border-pp-gray-2 text-pp-gray-1'

export { PaymentMethodToggleButtons }
