'use client'

import { PaymentType } from '@psychplus-v2/constants'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Flex, Text } from '@radix-ui/themes'

const PaymentMethodToggleButtons = ({
  value,
  onChange,
}: {
  value: PaymentType
  onChange: (value: PaymentType) => void
}) => (
  <ToggleGroup.Root
    type="single"
    value={value}
    onValueChange={(value) => {
      onChange(value as PaymentType)
    }}
  >
    <Flex className="flex-wrap" gap="4">
      {[PaymentType.Insurance, PaymentType.SelfPay].map((option) => (
        <ToggleGroup.Item
          key={option}
          value={option}
          className={toggleGroupItemClasses}
        >
          <Text weight="medium">{option}</Text>
        </ToggleGroup.Item>
      ))}
    </Flex>
  </ToggleGroup.Root>
)

const toggleGroupItemClasses =
  'w-[120px] h-[48px] rounded-6 border border-[#24366B] text-3 data-[state=on]:bg-[#24366B] data-[state=on]:text-[white]'

export { PaymentMethodToggleButtons }
