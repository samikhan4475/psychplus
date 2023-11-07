import { Text } from '@radix-ui/themes'

interface TableCellEmptyProps {
  label?: string
}

const TableCellEmpty = ({ label = 'N/A' }: TableCellEmptyProps) => (
  <Text className="text-gray-9">{label}</Text>
)

interface TableCellTextProps {
  text?: string
  emptyLabel?: string
}

const TableCellText = ({ text, emptyLabel }: TableCellTextProps) =>
  text ? <Text>{text}</Text> : <TableCellEmpty label={emptyLabel} />

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
    <Text
      style={{
        maxWidth: `${maxWidth}px`,
      }}
      className="block overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {text}
    </Text>
  )
}

export { TableCellEmpty, TableCellText, TableCellLongText }
