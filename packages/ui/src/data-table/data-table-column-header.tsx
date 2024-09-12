import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { type Column, type SortDirection } from '@tanstack/react-table'
import { Button } from '../button'

const renderSortIcon = (sortDir: SortDirection | false) => {
  if (!sortDir) {
    return <CaretSortIcon className="ml-1 h-4 w-4" />
  }
  return {
    asc: <CaretUpIcon className="ml-1 h-4 w-4" />,
    desc: <CaretDownIcon className="ml-1 h-4 w-4" />,
  }[sortDir]
}

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  className?: string
}

const DataTableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return (
      <Text size="1" weight="medium" className={className}>
        {title}
      </Text>
    )
  }

  const sortDir = column.getIsSorted()

  return (
    <Button
      size="1"
      variant="ghost"
      onClick={() => {
        column.toggleSorting(sortDir === 'asc')
      }}
      className={`flex  w-full justify-between whitespace-nowrap ${className}`}
    >
      <Text size="1" weight="medium" className={className}>
        {title}
      </Text>
      {renderSortIcon(sortDir)}
    </Button>
  )
}

export { DataTableColumnHeader }
