import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { IconButton, Popover, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components'
import { BlockTableContainer } from '../shared'

interface StatusClockPopoverProps<T> {
  title: string
  columns: ColumnDef<T>[]
  data: T[]
}

const StatusClockPopover = <T,>({
  columns,
  data,
  title,
}: StatusClockPopoverProps<T>) => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost" size="1">
          <CounterClockwiseClockIcon color="black" width={16} height={16} />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content className="z-10 flex-col p-1">
        <Text size="3" weight="medium">
          {title}
        </Text>
        <BlockTableContainer>
          <DataTable columns={columns} data={data} />
        </BlockTableContainer>
      </Popover.Content>
    </Popover.Root>
  )
}

export { StatusClockPopover }
