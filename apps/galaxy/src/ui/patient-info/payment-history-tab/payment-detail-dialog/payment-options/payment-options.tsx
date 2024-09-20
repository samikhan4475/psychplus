'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FormFieldError } from '@/components'
import { ChargeAmountInput } from './charge-amount-input'
import { ChargeDatePicker } from './charge-date-picker'
import { ChargeFrequencySelect } from './charge-frequency-select'
import { ChargeTimesSelect } from './charge-times-select'
import { CoinsuranceRow } from './coinsurance-row'
import { CopayRow } from './copay-row'
import { CustomAmountRow } from './custom-amount-row'
import { PaymentPlanRow } from './payment-plan-row'
import { PaymentTotal } from './payment-total'
import { RemainingBalance } from './remaining-balance'
import { RemainingDueRow } from './remaining-due-row'
import { TotalAmountInput } from './total-amount-input'

const PaymentOptions = () => {
  return (
    <Flex direction="column" className="rounded-2 shadow-2">
      <Flex className="w-full bg-blue-3 px-2 py-0.5">
        <Text size="2" weight="medium" className="flex-1">
          Payment Options
        </Text>
        <FormFieldError className="flex-1 text-center" name="paymentType" />
        <RemainingBalance />
      </Flex>

      <Flex direction="column" gap="2" className="px-2 py-2">
        <Flex direction="column" pt="2" className="gap-1.5">
          <CopayRow />
          <CoinsuranceRow />
          <RemainingDueRow />
          <CustomAmountRow />
          <PaymentPlanRow />
        </Flex>
        <Flex gap="3" pl="2">
          <ChargeDatePicker />
          <ChargeFrequencySelect />
          <ChargeAmountInput />
          <ChargeTimesSelect />
          <TotalAmountInput />
        </Flex>
        <PaymentTotal />
      </Flex>
    </Flex>
  )
}

export { PaymentOptions }
