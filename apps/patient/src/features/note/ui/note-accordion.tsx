'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components-v2'
import { NoteSectionName } from '../constants'
import { NoteData, NoteSectionItem } from '../types'

interface NoteAccordionContentProps<T extends NoteSectionItem | NoteData> {
  data: T[]
  handleSave: () => void
  labels?: T extends NoteData ? string[] : never
  sectionName: NoteSectionName
  isEdit?: boolean
}

interface NoteAccordionProps<T extends NoteSectionItem | NoteData> {
  title: string
  isCompleted?: boolean
  data: T[]
  sectionName: NoteSectionName
  labels?: T extends NoteData ? string[] : never
  content?: ({
    data,
    handleSave,
    labels,
    isEdit,
  }: NoteAccordionContentProps<T>) => React.ReactNode | undefined
  isEdit?: boolean
}

const NoteAccordion = <T extends NoteSectionItem | NoteData>({
  title,
  content,
  data,
  labels,
  sectionName,
  isCompleted = false,
  isEdit = true,
}: NoteAccordionProps<T>) => {
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
            {content?.({ data, handleSave, labels, sectionName, isEdit })}
          </Accordion.Content>
        )}
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { NoteAccordion, type NoteAccordionContentProps }
