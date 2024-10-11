'use client'

import { Flex } from '@radix-ui/themes'
import { DateCell, PropsWithRow } from '@/components'
import { StaffComment } from '@/types'
import { getSlashedPaddedDateString, getTimeLabel } from '@/utils'

const DateTimeCell = ({
  row: {
    original: { commentedOn },
  },
}: PropsWithRow<StaffComment>) => {
  return (
    <Flex width="100%" justify="between" align="center">
      <DateCell>{getSlashedPaddedDateString(commentedOn ?? '')}</DateCell>
      <DateCell className="text-pp-gray-1">
        {getTimeLabel(commentedOn ?? '')}
      </DateCell>
    </Flex>
  )
}

export { DateTimeCell }
