'use client'

import * as Accordion from '@radix-ui/react-accordion'
import { TriangleDownIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'

interface AccordionItemProps {
  title: string
  content: React.ReactNode
}

const PaymentMethodsAccordionItem = ({
  title,
  content,
}: AccordionItemProps) => (
  <Accordion.Item value={title}>
    <Accordion.Header className="flex items-center justify-between">
      <Accordion.Trigger className="group w-full">
        <Flex
          align="center"
          justify="between"
          p="2"
          className="border border-[#DDDDE3] bg-[#EEF2F6]"
        >
          <Text size="3" weight="medium">
            {title}
          </Text>
          <TriangleDownIcon
            height={24}
            width={24}
            strokeWidth={1}
            className=" group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Flex>
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="px-0 py-4 sm:p-4">{content}</Accordion.Content>
  </Accordion.Item>
)

export { PaymentMethodsAccordionItem }
