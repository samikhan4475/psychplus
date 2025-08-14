'use client'

import React, { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { FeeSchedule } from './types'

const HxStatusCell = ({ row }: PropsWithRow<FeeSchedule>) => {
  const [currentStatus, setCurrentStatus] = useState(row.original.status)

  const onChangeStatus = async (value: string) => {
    setCurrentStatus(value)
    toast.success('Status updated successfully')
  }

  return (
    <Flex>
      <CodesetSelectCell
        codeset={CODESETS.RecordStatus}
        className="w-[150px] text-gray-10"
        onValueChange={onChangeStatus}
        value={currentStatus}
        exclude={['Deleted', 'Archived']}
      />
    </Flex>
  )
}

export { HxStatusCell }
