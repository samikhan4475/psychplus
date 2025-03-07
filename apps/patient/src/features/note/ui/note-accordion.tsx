'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components-v2'

interface NoteAccordionContentProps {
  handleSave: () => void
}

interface NoteAccordionProps {
  title: string
  isCompleted?: boolean
  content?: ({
    handleSave,
  }: NoteAccordionContentProps) => React.ReactNode | undefined
}

const NoteAccordion = ({
  title,
  content,
  isCompleted = false,
}: NoteAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSave = () => {
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
              {isCompleted && (
                <Badge label="Completed" type="success" className="h-5" />
              )}
              <Accordion.Trigger
                onClick={() => {
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
            {content?.({ handleSave })}
          </Accordion.Content>
        )}
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { NoteAccordion, type NoteAccordionContentProps }
