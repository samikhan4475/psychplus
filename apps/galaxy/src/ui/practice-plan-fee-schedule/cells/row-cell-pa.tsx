'use client'

import { Text, TextField } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { FeeSchedule } from '../types'

const RowCellPa = ({
  row: { original: record },
}: PropsWithRow<FeeSchedule>) => {
  return (
    <>
      $
      {record.edit ? (
        <TextField.Root
          size="1"
          className="border-pp-gray-2 h-4 w-[130px] border border-solid !outline-none [box-shadow:none]"
          value={record.pa}
        />
      ) : (
        <Text className="text-1" size="1">
          {record.pa}
        </Text>
      )}
    </>
  )
}

export { RowCellPa }
