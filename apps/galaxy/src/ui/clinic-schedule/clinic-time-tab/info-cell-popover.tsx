import { Flex, IconButton, Popover } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { Info, X } from 'lucide-react'
import { DataTable } from '@/components'
import { BlockTableContainer } from '../shared'

interface InfoCellPopoverProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
}

const InfoCellPopover = <T,>({ columns, data }: InfoCellPopoverProps<T>) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost" size="1">
          <Info color="black" width={16} height={16} />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="z-10 flex-col p-1">
        <Flex className="mb-1 w-full" justify="end">
          <Popover.Close className="cursor-pointer">
            <X width={16} height={16} />
          </Popover.Close>
        </Flex>
        <BlockTableContainer>
          <DataTable columns={columns} data={data} />
        </BlockTableContainer>
      </Popover.Content>
    </Popover.Root>
  )
}

export { InfoCellPopover }
