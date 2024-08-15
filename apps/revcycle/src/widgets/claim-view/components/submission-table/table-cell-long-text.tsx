import { Text } from '@radix-ui/themes'
import { TableCellEmpty } from 'node_modules/@psychplus/ui/src/table-cell'
import { cn } from '@psychplus/ui/cn'

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
