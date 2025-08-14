'use client'

import { Text, TextField } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { FeeSchedule } from '../types'

const RowCellNp = ({
  row: { original: record },
}: PropsWithRow<FeeSchedule>) => {
  return (
    <>
      $
      {record.edit ? (
        <TextField.Root
          size="1"
          className="border-pp-gray-2 h-4 w-[130px] border border-solid !outline-none [box-shadow:none]"
          value={record.np}
        />
      ) : (
        <Text className="text-1" size="1">
          {record.np}
        </Text>
      )}
    </>
  )
}

export { RowCellNp }
