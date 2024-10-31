import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import TableActionCell from './table-action-cell'
import { Label } from 'react-aria-components'
import { FormFieldLabel } from '@/components'

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

const TableCellText = ({
  text,
  emptyLabel,
  className,
}: TableCellTextProps) => {
  let content

  if (text) {
    content = (
      <Text
        size="1"
        weight={'medium'}
        className={cn('whitespace-nowrap', className)}
      >
        {text}
      </Text>
    )
  } else {
    content = <TableCellEmpty label={emptyLabel} />
  }

  return content
}

interface TableCellLongTextProps {
  text?: string
  maxWidth: string
  onDelete: () => void;
}

const TableCellLongText = ({
  text,
  maxWidth,
  onDelete
}: TableCellLongTextProps) => {
  if (!text) {
    return <TableCellEmpty />
  }

  return (
    <Flex justify="between" align="center" style={{ position: 'relative', width: maxWidth }}>
      <Text
          className={cn(
            'text-pp-black-3 line-clamp-1 select-text overflow-ellipsis text-[#000000CC]',
          )}
          size="1"
          weight="regular"
        >
       {text}

        </Text>
    <TableActionCell onDelete={onDelete}/>
  </Flex>
  )
}

export { TableCellEmpty, TableCellText, TableCellLongText }
