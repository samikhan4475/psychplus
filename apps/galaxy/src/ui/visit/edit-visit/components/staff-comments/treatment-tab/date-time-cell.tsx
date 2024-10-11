'use client'

import { DateCell, PropsWithRow } from '@/components'
import { StaffComment } from '@/types'
import { getSlashedPaddedDateString, getTimeLabel } from '@/utils'
import { Flex } from '@radix-ui/themes'

const DateTimeCell = ({
  row: {
    original: { commentedOn },
  },
}: PropsWithRow<StaffComment>) => {
  return (
    <Flex justify="between" width="100%" align="center">
      <DateCell>{getSlashedPaddedDateString(commentedOn ?? '')}</DateCell>
      <DateCell className="text-pp-gray-1">{getTimeLabel(commentedOn ?? '')}</DateCell>
    </Flex>
  )
}

export { DateTimeCell }
