'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { StatusSelect } from '../status-select'
import { StaffLocation } from '../types'
import { StatusCellPopover } from './status-cell-popover'

const StatusCell = ({
  row: {
    original: { id, locationId, recordStatus },
  },
}: PropsWithRow<StaffLocation>) => {
  return (
    <Flex
      justify="center"
      align="center"
      className="p-2"
      gapX="1"
      height="100%"
      onClick={(e) => e.stopPropagation()}
    >
      <StatusCellPopover providerLocationId={id} />
      <StatusSelect locationId={locationId} recordStatus={recordStatus} />
    </Flex>
  )
}

export { StatusCell }
