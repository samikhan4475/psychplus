'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { Location } from '@/types'
import { StatusHistoryButton } from '../status-history-button'

const StatusCell = ({ row: { original } }: PropsWithRow<Location>) => {
  const options = useCodesetOptions(CODESETS.RecordStatus)
  return (
    <Flex gap="1" align="center">
      <StatusHistoryButton locationId={original?.id} />
      <SelectCell
        value={original?.recordStatus}
        options={options}
        disabled
        className="w-[100px]"
      />
    </Flex>
  )
}

export { StatusCell }
