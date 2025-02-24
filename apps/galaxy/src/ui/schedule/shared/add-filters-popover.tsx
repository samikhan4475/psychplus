'use client'

import {
  Button,
  Checkbox,
  Flex,
  Popover,
  ScrollArea,
  Text,
} from '@radix-ui/themes'
import { PlusIcon } from 'lucide-react'
import { useFiltersContext } from '../context'

interface AddFiltersPopoverProps {
  view: string
  onSave: (list: string[]) => void
  viewFilters: string[]
}

const AddFiltersPopover = ({
  view,
  onSave,
  viewFilters,
}: AddFiltersPopoverProps) => {
  const { filters, setFilters } = useFiltersContext()

  const isFilterVisible = (name: string): boolean => {
    return filters.includes(name)
  }
  const showFilter = (name: string) => {
    const updatedFilters = [...filters, name]
    setFilters(updatedFilters)
  }

  const hideFilter = (name: string) => {
    const updatedFilters = filters.filter((filter) => filter !== name)
    setFilters(updatedFilters)
  }

  return (
    <Popover.Root>
      <Popover.Trigger className='px-0'>
        <Button
          className="text-pp-text-primary-base bg-white text-[12px] font-[500] [box-shadow:none] gap-x-0"
          size="1"
          variant="outline"
        >
          <PlusIcon width="16" height="16" className="text-pp-icon-soft" />
          Add Filters
        </Button>
      </Popover.Trigger>
      <Popover.Content className="h-80 w-[170px] p-3">
        <ScrollArea className="relative flex flex-col">
          <Flex direction="column" className="bg-white sticky top-0 z-10">
            <Text className="text-[14px] font-[590]">Filters For</Text>
            <Text className="text-[14px] font-[590]">{view}</Text>
          </Flex>
          {viewFilters.map((item) => (
            <Text as="label" key={item}>
              <Flex
                gap="2"
                align="center"
                className="mb-2 text-[12px] font-[500]"
              >
                <Checkbox
                  defaultChecked={isFilterVisible(item)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      showFilter(item)
                    } else hideFilter(item)
                  }}
                  highContrast
                  size="1"
                />
                {item}
              </Flex>
            </Text>
          ))}
          <Popover.Close>
            <Button
              className="bg-pp-bg-primary sticky bottom-0 h-6 w-full"
              onClick={() => onSave(filters)}
            >
              Save Filters
            </Button>
          </Popover.Close>
        </ScrollArea>
      </Popover.Content>
    </Popover.Root>
  )
}

export { AddFiltersPopover }
