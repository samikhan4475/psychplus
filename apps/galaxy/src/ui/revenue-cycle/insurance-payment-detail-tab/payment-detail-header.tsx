import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { CaretUpIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { ClaimSelectionDialog } from '../dialogs/claim-selection-dialog'

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
        <ClaimSelectionDialog/>
      </Flex>
    </Flex>
  )
}

export { PaymentDetailHeader }
