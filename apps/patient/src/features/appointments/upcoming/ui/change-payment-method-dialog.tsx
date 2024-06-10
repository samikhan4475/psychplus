'use client'

import React, { useState } from 'react'
import { PaymentType } from '@psychplus-v2/constants'
import * as Accordion from '@radix-ui/react-accordion'
import { DialogClose } from '@radix-ui/react-dialog'
import { Button, Dialog, Flex, RadioGroup, Text } from '@radix-ui/themes'
import {
  CloseDialogIcon,
  EditIcon,
  PaymentMethodsAccordionItem,
} from '@/components-v2'

const ChangePaymentMethodDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    PaymentType.Insurance,
  )

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button variant="ghost" className="bg-[white]">
          <EditIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[850px]">
        <CloseDialogIcon />
        <Dialog.Title
          className="font-sans -tracking-[0.25px]"
          weight="bold"
          size="5"
        >
          Payment Method
        </Dialog.Title>
        <Flex
          className="rounded-t-3 border border-b-0 border-[#D9E2FC] bg-[#FCFDFF]"
          mt="5"
          pb="2"
          direction="column"
        >
          <Flex direction="column" px="3" py="2" gap="3">
            <Text size="4" weight="medium">
              Select Payment Method
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
                  {[PaymentType.Insurance, PaymentType.SelfPay].map(
                    (option) => (
                      <Text size="3" weight="medium" key={option}>
                        <Flex gap="1">
                          <RadioGroup.Item value={option} />
                          {option}
                        </Flex>
                      </Text>
                    ),
                  )}
                </Flex>
              </RadioGroup.Root>
            </Flex>
          </Flex>
        </Flex>

        {paymentMethod === PaymentType.Insurance && (
          <Accordion.Root
            type="single"
            className="w-full"
            defaultValue="Insurance on File"
          >
            <PaymentMethodsAccordionItem
              title="Insurance on File"
              content="Insurance on file listing here"
            />
            <PaymentMethodsAccordionItem
              title="Add/Edit Insurance"
              content="Add/Edit Insurance form here"
            />
            <PaymentMethodsAccordionItem
              title="Credit Card Details (Optional)"
              content="Credit Card Details (Optional)"
            />
          </Accordion.Root>
        )}

        {paymentMethod === PaymentType.SelfPay && (
          <Accordion.Root
            type="single"
            className="w-full"
            defaultValue="Credit/Debit Cards"
          >
            <PaymentMethodsAccordionItem
              title="Credit/Debit Cards"
              content="Add Credit/Debit Cards Listing here"
            />
            <PaymentMethodsAccordionItem
              title="Add New Card"
              content="Add New Card here"
            />
          </Accordion.Root>
        )}

        <Flex gap="3" justify="end" mt="5">
          <DialogClose>
            <Button
              color="gray"
              size="3"
              className="hover:bg-gray-2 active:bg-gray-3"
              variant="outline"
            >
              <Text weight="medium" className="text-[#151B4A]">
                Cancel
              </Text>
            </Button>
          </DialogClose>
          <Button className="bg-[#151B4A]" radius="full" size="3">
            <Text weight="medium">Update Info</Text>
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ChangePaymentMethodDialog }
