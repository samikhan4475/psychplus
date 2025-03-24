'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components-v2'

interface NoteAccordionContentProps {
  handleSave: () => Promise<void>
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

  const handleSave = async () => {
    setIsOpen(false)
  }

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Accordion.Root type="single">
      <Accordion.Item value={title}>
        <Accordion.Trigger
          asChild
          onClick={() => {
            toggleAccordion()
          }}
        >
          <Flex
            align="center"
            justify="between"
            p="2"
            className="border-pp-gray-2 bg-pp-blue-2 group w-full cursor-pointer rounded-2 border"
          >
            <Text size="3" weight="medium">
              {title}
            </Text>
            <Flex gap="5">
              {isCompleted && (
                <Badge label="Completed" type="success" className="h-5" />
              )}
              <ChevronDown
                height={20}
                width={20}
                strokeWidth={2}
                className={`group-data-[state=${
                  isOpen ? 'open' : 'closed'
                }]:rotate-180`}
                aria-hidden
              />
            </Flex>
          </Flex>
        </Accordion.Trigger>
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
