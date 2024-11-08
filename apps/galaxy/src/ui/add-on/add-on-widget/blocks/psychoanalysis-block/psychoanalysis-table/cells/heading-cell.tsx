'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components'
import { HeadingCellMenu } from './heading-cell-menu'

interface DataOption {
  value: string
  display: string
}
interface TableHeadingCellProps {
  title: string
  count: number
  data: DataOption[]
  width: string
}
const HeadingCell = (props: TableHeadingCellProps) => {
  const { count, title, data, width } = props
  return (
    <Flex style={{ position: 'relative', width: width }}>
      <FormFieldLabel className="ml-1 text-[12px]" required>
        {title}
      </FormFieldLabel>
      <FormFieldLabel className="ml-1 text-[12px]">({count})</FormFieldLabel>
      <HeadingCellMenu data={data} title={title} />
    </Flex>
  )
}

export { HeadingCell }
