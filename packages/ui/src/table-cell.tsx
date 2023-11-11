import { Text } from '@radix-ui/themes'
import { Tooltip } from './tooltip'

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
    <Tooltip content={text} delayDuration={250} className="max-w-[200px]">
      <Text
        style={{
          maxWidth: `${maxWidth}px`,
        }}
        className="block overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {text}
      </Text>
    </Tooltip>
  )
}

export { TableCellEmpty, TableCellText, TableCellLongText }
