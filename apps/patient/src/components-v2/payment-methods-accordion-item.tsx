'use client'

import { cn } from '@psychplus-v2/utils'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  title: string
  content: React.ReactNode
  triggerClassName?: string
}

const PaymentMethodsAccordionItem = ({
  title,
  content,
  triggerClassName = '',
}: AccordionItemProps) => (
  <Accordion.Item
    value={title}
    className="my-4 rounded-[6px] border border-[#EDEDF2]"
  >
    <Accordion.Header className="flex items-center justify-between">
      <Accordion.Trigger className="group w-full">
        <Flex
          align="center"
          justify="between"
          p="2"
          className={cn('rounded-[6px] bg-[#EEF2F6]', triggerClassName)}
        >
          <Text size="3" weight="medium">
            {title}
          </Text>
          <ChevronDown
            height={24}
            width={24}
            strokeWidth={1}
            className=" group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Flex>
      </Accordion.Trigger>
    </Accordion.Header>
    <Accordion.Content className="px-0 py-4 sm:p-4">
      {content}
    </Accordion.Content>
  </Accordion.Item>
)

export { PaymentMethodsAccordionItem }
