'use client'

import { useProfileStore } from '@/features/account/profile/store'
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
}) => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))
  const isPreferredPartnerAllowed = profile?.preferredPartnerUserWorklist && profile.preferredPartnerUserWorklist.length > 0
  const paymentTypeButtons = [PaymentType.Insurance, PaymentType.SelfPay, ...(!isPreferredPartnerAllowed ? [] : [PaymentType.PreferredPartner])]

  return <ToggleGroup.Root
    type="single"
    value={value}
    onValueChange={(value) => {
      if (value) onChange(value as PaymentType)
    }}
  >
    <Flex className="flex-wrap" gap="4">
      {paymentTypeButtons.map((option) => (
        <ToggleGroup.Item
          key={option}
          value={option}
          className={cn(
            toggleGroupItemClasses,
            option === PaymentType.Insurance &&
            disableInsurance &&
            disabledClasses,
            "min-w-[70px] w-fit h-[30px] sm:min-w-[120px] sm:h-[48px] px-3"
          )}
          disabled={option === PaymentType.Insurance && disableInsurance}
        >
          <Text weight="medium" className='text-[12px] sm:text-[16px]'>{option}</Text>
        </ToggleGroup.Item>
      ))}
    </Flex>
  </ToggleGroup.Root>
}

const toggleGroupItemClasses =
  'w-[120px] h-[48px] rounded-6 border border-[#24366B] text-3 data-[state=on]:bg-[#24366B] data-[state=on]:text-[white]'
const disabledClasses = 'cursor-not-allowed border-pp-gray-2 text-pp-gray-1'

export { PaymentMethodToggleButtons }
