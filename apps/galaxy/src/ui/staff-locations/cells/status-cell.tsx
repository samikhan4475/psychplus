'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Staff } from '@/ui/staff-management/types'
import { StatusSelect } from '../status-select'
import { StatusCellPopover } from './status-cell-popover'

const StatusCell = ({
  row: {
    original: { id: staffId },
  },
}: PropsWithRow<Staff>) => {
  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      gapX="2"
      onClick={(e) => e.stopPropagation()}
    >
      <StatusCellPopover staffId={staffId} />
      <StatusSelect />
    </Flex>
  )
}

export { StatusCell }
