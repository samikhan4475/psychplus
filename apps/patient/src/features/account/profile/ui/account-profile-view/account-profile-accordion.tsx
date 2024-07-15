'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown, PencilIcon } from 'lucide-react'

interface AccountProfileAccordionProps {
  title: string
  editable?: boolean
  content: (isEdit: boolean, onSave: () => void) => React.ReactNode
}

const AccountProfileAccordion = ({
  title,
  content,
  editable = true,
}: AccountProfileAccordionProps) => {
  const [isEdit, setIsEdit] = useState(!editable)
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
    setIsEdit(false)
    setIsOpen(false)
  }

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Accordion.Root type="single">
      <Accordion.Item value={title}>
        <Accordion.Header className="group flex items-center justify-between">
          <Flex
            align="center"
            justify="between"
            p="2"
            className="w-full rounded-2 border border-[#DDDDE3] bg-[#EEF2F6]"
          >
            <Text size="3" weight="medium">
              {title}
            </Text>
            <Flex gap="5">
              {!isEdit && (
                <Accordion.Trigger
                  onClick={() => {
                    setIsEdit(true)
                    if (!isOpen) {
                      toggleAccordion()
                    }
                  }}
                >
                  <Flex align="center" gap="1" className="cursor-pointer">
                    <PencilIcon
                      height={15}
                      width={15}
                      strokeWidth={2}
                      aria-hidden
                      color="#194595"
                    />
                    <Text className="text-[#194595] underline">Edit</Text>
                  </Flex>
                </Accordion.Trigger>
              )}

              <Accordion.Trigger
                onClick={() => {
                  if (editable) setIsEdit(false)
                  toggleAccordion()
                }}
              >
                <ChevronDown
                  height={20}
                  width={20}
                  strokeWidth={2}
                  className={`group-data-[state=${
                    isOpen ? 'open' : 'closed'
                  }]:rotate-180`}
                  aria-hidden
                />
              </Accordion.Trigger>
            </Flex>
          </Flex>
        </Accordion.Header>
        {isOpen && (
          <Accordion.Content className="rounded-b-2 border-x border-b border-[#DDDDE3] p-4">
            {content(isEdit, handleSave)}
          </Accordion.Content>
        )}
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { AccountProfileAccordion }
