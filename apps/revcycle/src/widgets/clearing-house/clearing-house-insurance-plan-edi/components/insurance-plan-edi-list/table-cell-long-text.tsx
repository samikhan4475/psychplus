import { Text } from '@radix-ui/themes'
import { TableCellEmpty } from '@psychplus/ui/table-cell'

interface TableCellLongTextProps {
  text?: string
}

const TableCellLongText = ({ text }: TableCellLongTextProps) => {
  if (!text) {
    return <TableCellEmpty />
  }
  return (
    <Text
      size="1"
      className="block overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {text}
    </Text>
  )
}

export { TableCellLongText }
