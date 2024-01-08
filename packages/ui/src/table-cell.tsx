import { Text } from '@radix-ui/themes'
import { formatDate, formatTime, isEmptyDate } from '@psychplus/utils/time'
import { cn } from './cn'
import { Tooltip } from './tooltip'

interface TableCellEmptyProps {
  label?: string
}

const TableCellEmpty = ({ label = 'N/A' }: TableCellEmptyProps) => (
  <Text size="1" className="text-gray-9">
    {label}
  </Text>
)

interface TableCellTextProps {
  text?: string
  emptyLabel?: string
  className?: string
}

const TableCellText = ({ text, emptyLabel, className }: TableCellTextProps) =>
  text ? (
    <Text size="1" className={cn('whitespace-nowrap', className)}>
      {text}
    </Text>
  ) : (
    <TableCellEmpty label={emptyLabel} />
  )

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
        size="1"
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

interface TableCellDateTimeProps {
  date?: string
}

const TableCellDateTime = ({ date }: TableCellDateTimeProps) => {
  if (!date || isEmptyDate(date)) {
    return <TableCellEmpty />
  }

  const dateObject = new Date(date)
  const formattedDate = formatDate(dateObject)
  const formattedTime = formatTime(dateObject)
  const dateTimeText = `${formattedDate} ${formattedTime}`

  return (
    <TableCellText
      text={dateTimeText}
      className="font-['Helvetica'] text-[11px]"
    />
  )
}

interface TableCellCodeProps {
  value: string
  getLabel: (value: string) => string | undefined
}

const TableCellCode = ({ value, getLabel }: TableCellCodeProps) => {
  return <TableCellText text={getLabel(value)} />
}

export {
  TableCellEmpty,
  TableCellText,
  TableCellLongText,
  TableCellDateTime,
  TableCellCode,
}
