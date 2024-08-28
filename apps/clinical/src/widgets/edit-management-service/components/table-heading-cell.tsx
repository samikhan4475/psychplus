'use client'

import { Flex, Text } from '@radix-ui/themes'
import { HeadingCellMenu } from './heading-cell-menu'

interface TableHeadingCellProps {
  title: string
  count: number
  required?: boolean
}
const TableHeadingCell = (props: TableHeadingCellProps) => {
  const { count, title, required } = props
  return (
    <Flex
      justify={'between'}
      width={'100%'}
      align={'center'}
      gap={'2'}
      className="px-1 py-[2px]"
    >
      <Text size={'2'} weight={'regular'} className="text-[#1C2024]">
        {title} {required && <span className="text-[#FF0000]">*</span>} ({count}
        )
      </Text>
      <HeadingCellMenu />
    </Flex>
  )
}

export default TableHeadingCell
