'use client'

import { Flex, Text } from '@radix-ui/themes'
import { AmountInput } from './amount-input'
import { BalanceBlock } from './balance-block'
import { CoInsBlock } from './co-ins-block'
import { CoPayBlock } from './co-pay-block'
import { InsVerificationSelect } from './ins-verfication-select'
import { PaymentMediumSelect } from './payment-medium-select'
import { RemainingInput } from './remaining-input'

const PaymentInfoSection = () => {
  return (
    <Flex direction="column" className="rounded-2 shadow-2">
      <Text className="bg-blue-3 px-2 py-0.5" size="2" weight="medium">
        Payment Information
      </Text>
      <Flex gap="2" direction="column" className="px-2">
        <Flex gap="3" align="center" className="pt-2">
          <RemainingInput />
          <AmountInput />
          <PaymentMediumSelect />
          <InsVerificationSelect />
        </Flex>
        <Flex className="my-2 overflow-hidden rounded-2 shadow-2">
          <CoPayBlock />
          <CoInsBlock />
          <BalanceBlock />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { PaymentInfoSection }
