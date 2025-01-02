'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { SchedulingHistoryData } from '../types'

const AdmittingDateCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  const now = new Date()
  const currentTime = now.toISOString().slice(0, 16)
  return (
    <Flex p="1" width="100%">
      <TextField.Root
        placeholder="time"
        defaultValue={currentTime}
        type="datetime-local"
        size="1"
        className={textFieldClassName}
      />
    </Flex>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-4 rounded-2 text-[11px] border border-solid !outline-none [box-shadow:none]'
export { AdmittingDateCell }
