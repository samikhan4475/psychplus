import { Text, Tooltip } from '@radix-ui/themes'
import { TableCellEmpty } from 'node_modules/@psychplus/ui/src/table-cell'

interface TableCellLongTextProps {
  text?: string
  maxWidth?: number
}

const TableCellLongText = ({
  text,
  maxWidth = 300,
}: TableCellLongTextProps) => {
  if (!text) {
    return <TableCellEmpty />
  }
  return (
    <Tooltip content={text || ''} delayDuration={250} className="max-w-[200px]">
      <Text
        size="1"
        style={{ maxWidth: `${maxWidth}px` }}
        className="block overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {text}
      </Text>
    </Tooltip>
  )
}

export { TableCellLongText }
