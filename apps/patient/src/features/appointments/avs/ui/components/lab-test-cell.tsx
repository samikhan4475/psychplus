import React from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { LabOrder } from '../../types'

interface ActionsCellProps {
  row: LabOrder
  className?: string
}

const LabTestCell = ({ row, className }: ActionsCellProps) => {
  if (!row?.labTests) return null
  const testNames = row?.labTests
    .filter((item) => item.recordStatus === 'Active')
    .map((item) => item.testName)
    .join(', ')

  return (
    <Flex className={cn('flex h-full flex-col justify-center', className)}>
      <Tooltip content={<Text className="select-text">{testNames}</Text>}>
        <Text
          className={cn(
            'text-pp-black-3 line-clamp-1 select-text overflow-ellipsis',
            className,
          )}
          size="1"
          weight="regular"
        >
          {testNames}
        </Text>
      </Tooltip>
    </Flex>
  )
}
export { LabTestCell }
