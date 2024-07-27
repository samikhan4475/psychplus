import { PropsWithChildren, ReactNode, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Box, Text } from '@radix-ui/themes'

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
            <Text size="3" weight="medium" className="text-gray-800">
              {title}
            </Text>
            <Box className="transition-transform duration-200">{buttons}</Box>
          </Box>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="p-4">{children}</Accordion.Content>
    </Accordion.Item>
  )
}

export { ClaimAccordionItem }
