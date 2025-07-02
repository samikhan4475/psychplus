'use client'

import React from 'react'
import {
  Button,
  Checkbox,
  Flex,
  Popover,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { PlusCircle } from 'lucide-react'
import { ALWAYS_VISIBLE_COLUMNS } from '../constants'

interface AddColumnsPopoverProps {
  view: string
  onSave: (list: string[]) => void
  currentColumns: string[]
  saveCurrentColumns: (list: string[]) => void
  viewColumns: string[]
  viewColumnsKey: Record<string, string>
}

const AddColumnsPopover = ({
  view,
  onSave,
  currentColumns,
  saveCurrentColumns,
  viewColumns,
  viewColumnsKey,
}: AddColumnsPopoverProps) => {
  const addColumn = (name: string) => {
    const updatedColumns = [...currentColumns, name]
    saveCurrentColumns(updatedColumns)
  }

  const removeColumn = (name: string) => {
    const updatedColumns = currentColumns.filter((column) => column !== name)
    saveCurrentColumns(updatedColumns)
  }

  return (
    <Popover.Root>
      <Popover.Trigger className="px-0">
        <Button
          className="text-pp-text-primary-base gap-x-0 text-[12px] font-[500] [box-shadow:none]"
          size="1"
          variant="outline"
        >
          <PlusCircle size={'18'} color="black" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="h-80 w-[170px] p-3">
        <ScrollArea className="relative flex flex-col">
          <Flex direction="column" className="bg-white sticky top-0 z-10">
            <Text className="text-[14px] font-[590]">Columns For</Text>
            <Text className="text-[14px] font-[590]">{view}</Text>
          </Flex>
          {viewColumns.map((col) => (
            <Text as="label" key={col}>
              <Flex
                gap="2"
                align="center"
                className="mb-2 text-[12px] font-[500]"
              >
                <Checkbox
                  defaultChecked={currentColumns.includes(col)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      addColumn(col)
                    } else {
                      removeColumn(col)
                    }
                  }}
                  highContrast
                  size="1"
                />
                {viewColumnsKey[col]}
              </Flex>
            </Text>
          ))}
          <Popover.Close>
            <Button
              className="bg-pp-bg-primary sticky bottom-0 h-6 w-full"
              onClick={() => {
                onSave(
                  currentColumns.length === 0
                    ? ALWAYS_VISIBLE_COLUMNS
                    : currentColumns,
                )
              }}
            >
              Save View
            </Button>
          </Popover.Close>
        </ScrollArea>
      </Popover.Content>
    </Popover.Root>
  )
}

export { AddColumnsPopover }
