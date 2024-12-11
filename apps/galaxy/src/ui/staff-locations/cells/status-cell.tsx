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
      width="100%"
      height="100%"
      gapX="2"
      onClick={(e) => e.stopPropagation()}
    >
      <StatusCellPopover providerLocationId={id} />
      <StatusSelect locationId={locationId} recordStatus={recordStatus} />
    </Flex>
  )
}

export { StatusCell }
