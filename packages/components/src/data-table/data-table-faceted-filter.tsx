import { CheckIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Box, Flex, Inset } from '@radix-ui/themes'
import { Column } from '@tanstack/react-table'
import { Badge } from '@psychplus/ui/badge'
import { Button } from '@psychplus/ui/button'
import { cn } from '@psychplus/ui/cn'
import * as Command from '@psychplus/ui/command'
import { Popover } from '@psychplus/ui/popover'
import { Separator } from '@psychplus/ui/separator'

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: {
    label: string
    value: string
  }[]
}

const DataTableFacetedFilter = <TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) => {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline" size="2">
          <PlusCircledIcon />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" />
              <Badge variant="soft" className="lg:hidden">
                {selectedValues.size}
              </Badge>
              <Box className="hidden lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="soft">{selectedValues.size} selected</Badge>
                ) : (
                  <Flex gap="1">
                    {options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge variant="soft" key={option.value}>
                          {option.label}
                        </Badge>
                      ))}
                  </Flex>
                )}
              </Box>
            </>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-[200px]">
        <Inset>
          <Command.Root>
            <Command.Input placeholder={title} />
            <Command.List>
              <Command.Empty>No results found.</Command.Empty>
              <Command.Group>
                {options.map((option) => {
                  const isSelected = selectedValues.has(option.value)
                  return (
                    <Command.Item
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          selectedValues.delete(option.value)
                        } else {
                          selectedValues.add(option.value)
                        }
                        const filterValues = Array.from(selectedValues)
                        column?.setFilterValue(
                          filterValues.length ? filterValues : undefined,
                        )
                      }}
                    >
                      <Flex
                        align="center"
                        justify="center"
                        mr="2"
                        className={cn(
                          'h-4 w-4 rounded-sm border',
                          isSelected
                            ? 'border-transparent bg-primary text-foreground'
                            : '[&_svg]:invisible',
                        )}
                      >
                        <CheckIcon className={cn('h-4 w-4')} />
                      </Flex>
                      <span>{option.label}</span>
                      {facets?.get(option.value) && (
                        <Flex
                          align="center"
                          justify="center"
                          className="ml-auto h-4 w-4 font-mono text-xs"
                        >
                          {facets.get(option.value)}
                        </Flex>
                      )}
                    </Command.Item>
                  )
                })}
              </Command.Group>
              {selectedValues.size > 0 && (
                <>
                  <Command.Separator />
                  <Command.Group>
                    <Command.Item
                      className="items-center justify-center"
                      onSelect={() => column?.setFilterValue(undefined)}
                    >
                      Clear filters
                    </Command.Item>
                  </Command.Group>
                </>
              )}
            </Command.List>
          </Command.Root>
        </Inset>
      </Popover.Content>
    </Popover.Root>
  )
}

export { DataTableFacetedFilter }
