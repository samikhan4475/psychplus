'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components'
import { HeadingCellMenu } from './table-cell-menu'

interface ThearpyDataOption {
  value: string
  display: string
}
interface TableHeadingCellProps {
  title: string
  count: number
  data: ThearpyDataOption[]
  width: string
}

const TableHeadingCell = (props: TableHeadingCellProps) => {
  const { count, title, data, width} = props
  return (
    <Flex style={{ position: 'relative', width: width }}>
      <FormFieldLabel required className="text-[12px] ml-1 text-[#1C2024]">
        {title}
      </FormFieldLabel>
      <FormFieldLabel className="text-[12px] ml-1">
        ({count})
      </FormFieldLabel>
      <HeadingCellMenu data={data} title={title}/>
    </Flex>
  )
}

export default TableHeadingCell
