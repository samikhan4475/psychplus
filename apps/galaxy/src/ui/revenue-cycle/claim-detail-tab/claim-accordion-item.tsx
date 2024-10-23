import { PropsWithChildren, ReactNode, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface ClaimAccordionItemProps extends PropsWithChildren {
  title: string
  buttons?: ReactNode
  className?: string
}

const ClaimAccordionItem = ({
  title,
  children,
  buttons,
  className,
}: ClaimAccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Accordion.Item
      value={title}
      className={cn(
        'border-pp-ac-border my-1 flex-1 rounded-3 border',
        className,
      )}
    >
      <Accordion.Header>
        <Accordion.Trigger asChild onClick={() => setIsOpen(!isOpen)}>
          <Flex className="bg-pp-table-subRows flex w-full cursor-pointer items-center justify-between rounded-1 p-1">
            <Flex align="center">
              <Flex className="mr-3 transition-transform duration-200">
                {isOpen ? (
                  <ChevronDownIcon
                    className="text-gray-700 h-4 w-4"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronUpIcon
                    className="text-gray-700 h-4 w-4"
                    aria-hidden="true"
                  />
                )}
              </Flex>
              <Text size="3" weight="medium" className="text-gray-800">
                {title}
              </Text>
            </Flex>
            {buttons && <Flex>{buttons}</Flex>}
          </Flex>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="p-4">{children}</Accordion.Content>
    </Accordion.Item>
  )
}

export { ClaimAccordionItem }
