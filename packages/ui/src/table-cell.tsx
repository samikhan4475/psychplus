import React from 'react'
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
  isToolTip?: boolean
  isLight?: boolean
}

const TableCellText = ({
  text,
  emptyLabel,
  className,
  isToolTip = false,
  isLight = false,
}: TableCellTextProps) => {
  let content

  if (text) {
    if (isToolTip) {
      content = (
        <Tooltip content={text} delayDuration={250} className="max-w-[100px]">
          <Text
            size="1"
            weight="light"
            className={cn('whitespace-nowrap', className)}
          >
            {text}
          </Text>
        </Tooltip>
      )
    } else {
      content = (
        <Text
          size="1"
          weight={isLight ? 'light' : 'medium'}
          className={cn('whitespace-nowrap', className)}
        >
          {text}
        </Text>
      )
    }
  } else {
    content = <TableCellEmpty label={emptyLabel} />
  }

  return content
}

interface TableCellLongTextProps {
  text?: string
  maxWidth?: number
  isLight?: boolean
}

const TableCellLongText = ({
  text,
  maxWidth = 300,
  isLight = false,
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
        weight={`${isLight ? 'light' : 'medium'}`}
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

interface TableCellInputProps {
  name: string
  placeholder?: string
  className?: string
}

const TableCellInput = React.forwardRef<HTMLInputElement, TableCellInputProps>(
  (props, ref) => {
    const { className, placeholder, ...formFieldProps } = props

    return (
      <input
        className={`${className ?? ''} outline-none`}
        placeholder={placeholder ?? ''}
        {...formFieldProps}
        ref={ref}
      />
    )
  },
)

TableCellInput.displayName = 'TableCellInput'

export {
  TableCellEmpty,
  TableCellText,
  TableCellLongText,
  TableCellDateTime,
  TableCellCode,
  TableCellInput,
}
