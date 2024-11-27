import { Box, Flex, IconButton, Popover } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { Info, X } from 'lucide-react'
import { DataTable } from '@/components'

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
        <Box className="border-pp-focus-bg rounded-[4px] border p-1.5">
          <DataTable columns={columns} data={data} />
        </Box>
      </Popover.Content>
    </Popover.Root>
  )
}

export { InfoCellPopover }
