import { Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { TableCellEmpty } from '@psychplus/ui/table-cell'

interface TableCellLongTextProps {
  text?: string
  maxWidth?: number
}

const TableCellLongText = ({ text, maxWidth }: TableCellLongTextProps) => {
  if (!text) {
    return <TableCellEmpty />
  }
  return (
    <Text
      size="1"
      className={cn('block overflow-hidden text-ellipsis whitespace-nowrap', {
        maxWidth: `${maxWidth}px`,
      })}
    >
      {text}
    </Text>
  )
}

export { TableCellLongText }
