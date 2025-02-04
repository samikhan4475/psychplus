'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, TextCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { SchedulingHistoryData } from '../types'

const NOT_SET = 'NOT_SET'
const ServiceOfferedCell = ({ row }: PropsWithRow<SchedulingHistoryData>) => {
  const { serviceOffered } = row.original
  const serviceOfferedOptions = useCodesetOptions(CODESETS.ServicesOffered)
  const label =
    serviceOffered === NOT_SET
      ? NOT_SET
      : serviceOfferedOptions?.find((item) => item?.value === serviceOffered)
          ?.label || ''

  return (
    <Flex align="center" gap="1" p="1">
      <TextCell>{label}</TextCell>
    </Flex>
  )
}

export { ServiceOfferedCell }
