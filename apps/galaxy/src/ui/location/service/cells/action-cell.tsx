'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { EditUnderlinedIcon } from '@/components/icons'

const ActionCell = () => {
  return (
    <Flex align="center" gap="2">
      <Trash2 width={14} height={14} />
      <EditUnderlinedIcon />
    </Flex>
  )
}

export { ActionCell }
