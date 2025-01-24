'use client'

import { AppointmentType, PaymentType } from '@psychplus-v2/constants'
import { Box, Flex, Text } from '@radix-ui/themes'
import {
  PaymentMethodAccordion,
  PaymentMethodToggleButtons,
} from '@/components-v2'
import { PaymentMethodProps } from '@/features/appointments/book/types'

const PaymentMethods = ({
  creditCards,
  stripeApiKey,
  paymentMethod,
  setPaymentMethod,
  patientInsurances,
  insurancePayers,
  appointmentType,
}: PaymentMethodProps) => {
  const optionalText = `${
    paymentMethod === PaymentType.Insurance ? 'Insurance' : 'Credit/Debit Cards'
  } ${
    appointmentType === AppointmentType.InPerson ? '(Optional)' : '(Required)'
  }`

  return (
    <Box>
      <Flex mt="5" pb="2" direction="column">
        <Flex direction="column" px="3" py="2" gap="3">
          <Text size="7" weight="bold" className="text-[#151B4A]">
            Do you want to use your insurance <br /> for this visit?
          </Text>
          <PaymentMethodToggleButtons
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </Flex>
        <Text size="5" weight="medium" className="mt-7 text-[#151B4A]">
          {optionalText}
        </Text>
      </Flex>

      <PaymentMethodAccordion
        paymentMethod={paymentMethod}
        stripeApiKey={stripeApiKey}
        creditCards={creditCards}
        patientInsurances={patientInsurances}
        insurancePayers={insurancePayers}
      />
    </Box>
  )
}

export { PaymentMethods }
