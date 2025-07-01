'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { LocationPractice } from '@/types'
import { StatusHistoryButton } from '../status-history-button'

const StatusCell = ({ row: { original } }: PropsWithRow<LocationPractice>) => {
  const options = useCodesetOptions(CODESETS.RecordStatus)
  return (
    <Flex gap="1" align="center">
      <StatusHistoryButton locationId={original?.id} />
      <SelectCell
        value={original?.recordStatus}
        options={options}
        className="w-[100px]"
        disabled
      />
    </Flex>
  )
}

export { StatusCell }
