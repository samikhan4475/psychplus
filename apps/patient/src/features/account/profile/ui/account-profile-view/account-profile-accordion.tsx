'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import { ChevronDown, PencilIcon } from 'lucide-react'
import { RelationshipFormDialog } from './emergency-contact-card/relationship-form-dialog'
import { RelationshipData } from '@psychplus-v2/types'

interface AccountProfileAccordionProps {
  title: string
  editable?: boolean
  addEditable?: boolean
  content?: (
    isEdit: boolean,
    onSave: () => void,
    relationshipDataList?: RelationshipData[],
    setDeleteItem?: React.Dispatch<React.SetStateAction<RelationshipData | undefined>>,
    setSelectedId?: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => React.ReactNode | undefined;
  modalContent?: (
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => React.ReactNode
}

const AccountProfileAccordion = ({
  title,
  content,
  editable = true,
  addEditable = false,
  modalContent,
}: AccountProfileAccordionProps) => {
  const [isEdit, setIsEdit] = useState(!editable)
  const [isOpen, setIsOpen] = useState(false)
  const [isAddRelationshipModalOpen, setIsAddRelationshipModalOpen] = useState(false)

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
              {addEditable && (
                <Flex align="center" gap="1">
                  <RelationshipFormDialog
                    modalTitle="Add Relationship"
                    content={
                      modalContent?.(isAddRelationshipModalOpen, setIsAddRelationshipModalOpen)
                    }
                    open={isAddRelationshipModalOpen}
                    setOpen={setIsAddRelationshipModalOpen}
                  />
                </Flex>
              )}

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
            {content?.(isEdit, handleSave)}
          </Accordion.Content>
        )}
      </Accordion.Item>
    </Accordion.Root>
  )
}

export { AccountProfileAccordion }
