'use client'

import { PaymentType } from '@psychplus-v2/constants'
import { cn } from '@psychplus-v2/utils'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Flex, Text } from '@radix-ui/themes'
import { useProfileStore } from '@/features/account/profile/store'

const PaymentMethodToggleButtons = ({
  value,
  onChange,
  disableInsurance,
  isCall = false,
}: {
  value: PaymentType
  onChange: (value: PaymentType) => void
  disableInsurance: boolean
  isCall?: boolean
}) => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))
  const isPreferredPartnerAllowed =
    !isCall &&
    profile?.preferredPartnerUserWorklist &&
    profile.preferredPartnerUserWorklist.length > 0
  const paymentTypeButtons = [
    PaymentType.Insurance,
    PaymentType.SelfPay,
    ...(!isPreferredPartnerAllowed ? [] : [PaymentType.PreferredPartner]),
  ]

  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(value) => {
        if (value) onChange(value as PaymentType)
      }}
    >
      <Flex className="flex-wrap" gap={isCall ? '2' : '4'}>
        {paymentTypeButtons.map((option) => (
          <ToggleGroup.Item
            key={option}
            value={option}
            className={cn(
              toggleGroupItemClasses,
              option === PaymentType.Insurance &&
                disableInsurance &&
                disabledClasses,
              isCall
                ? 'flex h-[22px] w-fit items-center px-2'
                : 'h-[30px] w-fit min-w-[70px] px-3 sm:h-[48px] sm:min-w-[120px]',
            )}
            disabled={option === PaymentType.Insurance && disableInsurance}
          >
            <Text
              weight="medium"
              className={cn(
                isCall ? 'text-[12px]' : 'text-[12px] sm:text-[16px]',
              )}
            >
              {option}
            </Text>
          </ToggleGroup.Item>
        ))}
      </Flex>
    </ToggleGroup.Root>
  )
}

const toggleGroupItemClasses =
  'w-[120px] h-[48px] rounded-6 border border-[#24366B] text-3 data-[state=on]:bg-[#24366B] data-[state=on]:text-[white]'
const disabledClasses = 'cursor-not-allowed border-pp-gray-2 text-pp-gray-1'

export { PaymentMethodToggleButtons }
