import { PropsWithChildren, ReactNode, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'

interface ClaimAccordionItemProps extends PropsWithChildren {
  title: string
  buttons?: ReactNode
}

const ClaimAccordionItem = ({
  title,
  children,
  buttons,
}: ClaimAccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Accordion.Item
      value={title}
      className="my-2 rounded-3 border border-[#e8e7e7]"
    >
      <Accordion.Header>
        <Accordion.Trigger asChild onClick={() => setIsOpen(!isOpen)}>
          <Box className="flex w-full cursor-pointer items-center justify-between rounded-1 bg-[#eeeeee] p-1">
            <Flex align="center">
              <Box className="mr-3 transition-transform duration-200">
                {isOpen ? (
                  <ChevronUpIcon
                    className="text-gray-700 h-4 w-4"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDownIcon
                    className="text-gray-700 h-4 w-4"
                    aria-hidden="true"
                  />
                )}
              </Box>
              <Text size="3" weight="medium" className="text-gray-800">
                {title}
              </Text>
            </Flex>
          </Box>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="p-4">{children}</Accordion.Content>
    </Accordion.Item>
  )
}

export { ClaimAccordionItem }
