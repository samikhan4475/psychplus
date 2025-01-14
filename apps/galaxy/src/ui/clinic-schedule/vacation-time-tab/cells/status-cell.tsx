'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { StatusHistoryButton } from '../status-history-button'
import { VacationsTime } from '../types'

const StatusCell = ({ row: { original } }: PropsWithRow<VacationsTime>) => {
  return (
    <Flex gap="2" className="w-full" align="center">
      <StatusHistoryButton vacationTimeId={String(original.id)} />
      <SelectCell
        className="flex-1"
        options={options}
        value={original?.vacationStatus}
      />
    </Flex>
  )
}

export { StatusCell }

const options = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Active', value: 'Active' },
]
