import React from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'

interface AccordianProps {
  accordions: { title: string; content: React.ReactNode }[]
  openItems: string[]
  setOpenItems: React.Dispatch<React.SetStateAction<string[]>>
}


const MultiAccordian = ({
  accordions,
  openItems,
  setOpenItems,
}: AccordianProps) => {
  const borderClass = (idx: number, value: string) => {
    const isItemOpen = openItems.includes(value)

    if (idx === 0) {
      return 'rounded-t-2 border-x border-t'
    } else if (idx === accordions.length - 1) {
      return isItemOpen ? 'border-x' : 'rounded-b-2 border-x border-b'
    } else {
      return 'border-x'
    }
  }

  return (
    <Accordion.Root
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
    >
      {accordions.map((accordion, index) => (
        <Accordion.Item value={accordion.title} key={accordion.title}>
          <Accordion.Header className="group flex items-center justify-between">
            <Flex
              align="center"
              justify="between"
              p="2"
              className={`w-full border-[#DDDDE3] bg-[#EEF2F6] ${borderClass(
                index,
                accordion.title,
              )}`}
            >
              <Text size="3" weight="medium">
                {accordion.title}
              </Text>
              <Flex gap="5">
                <Accordion.Trigger>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 15 15"
                    className={`group-data-[state=open]:rotate-180`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path>
                  </svg>
                </Accordion.Trigger>
              </Flex>
            </Flex>
          </Accordion.Header>
          <Accordion.Content
            className={`flex-wrap border-x border-[#DDDDE3] p-4 ${
              index === accordions.length - 1 ? 'rounded-b-2 border-b' : ''
            }`}
          >
            {accordion.content}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}

export default MultiAccordian
