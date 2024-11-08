import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { ActionCell } from './action-cell'

interface TableCellEmptyProps {
  label?: string
}

const TableCellEmpty = ({ label = 'Empty' }: TableCellEmptyProps) => (
  <Text size="1" className="text-gray-9">
    {label}
  </Text>
)

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
            'text-pp-black-3 line-clamp-1 select-text overflow-ellipsis',
          )}
          size="1"
          weight="regular"
        >
       {text}

        </Text>
    <ActionCell onDelete={onDelete}/>
  </Flex>
  )
}

export { TableCellEmpty, TableCellLongText }