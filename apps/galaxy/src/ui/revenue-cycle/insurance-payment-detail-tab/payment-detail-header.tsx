import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { CaretUpIcon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'

const PaymentDetailHeader = () => {
  return (
    <Flex
      gap="2"
      align="center"
      justify="between"
      className="bg-gray-3 px-2 py-1 "
    >
      <Flex align="center">
        <Accordion.AccordionTrigger>
          <CaretUpIcon className="mr-1 cursor-pointer" width="22" height="22" />
        </Accordion.AccordionTrigger>

        <Text size="2" className="font-medium">
          Link Claims
        </Text>
      </Flex>
      <Flex
        gap="2"
        align="center"
        className="ml-3 cursor-pointer hover:underline"
      >
        <Button
          size="1"
          highContrast
          variant="solid"
          onClick={() => {
            // TODO: Implemention of Claim Modal Opening
          }}
        >
          <PlusIcon />
          Add New Claim
        </Button>
      </Flex>
    </Flex>
  )
}

export { PaymentDetailHeader }
