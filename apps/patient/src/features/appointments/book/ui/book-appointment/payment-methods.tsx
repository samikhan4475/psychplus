'use client'

import { PaymentType } from '@psychplus-v2/constants'
import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes'
import { PaymentMethodAccordion, RadioGroupItem } from '@/components-v2'
import { PaymentMethodProps } from '@/features/appointments/book/types'

const PaymentMethods = ({
  creditCards,
  stripeApiKey,
  paymentMethod,
  setPaymentMethod,
  patientInsurances,
  insurancePayers,
}: PaymentMethodProps) => {
  return (
    <Box>
      <Flex mt="5" pb="2" direction="column">
        <Flex direction="column" px="3" py="2" gap="3">
          <Text size="7" weight="bold" className="text-[#151B4A]">
            Do you want to use your insurance <br /> for this visit?
          </Text>
          <Flex gap="8">
            <RadioGroup.Root
              value={paymentMethod}
              data-testid="signup-is-parent-or-guardian-input"
              onValueChange={(value) => {
                setPaymentMethod(value as PaymentType)
              }}
            >
              <Flex gap="8">
                {['Yes', PaymentType.SelfPay].map((option) => (
                  <Text size="3" weight="medium" key={option}>
                    <Flex gap="1">
                      <RadioGroupItem
                        key={option}
                        id={option}
                        value={
                          option === 'Yes' ? PaymentType.Insurance : option
                        }
                      >
                        {option}
                      </RadioGroupItem>
                    </Flex>
                  </Text>
                ))}
              </Flex>
            </RadioGroup.Root>
          </Flex>
        </Flex>
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
