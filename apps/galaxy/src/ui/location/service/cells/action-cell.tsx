'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Service } from '@/types'
import { DeleteServiceButton } from '../delete-service-button'
import { EditServiceButton } from '../edit-service-button'

interface ActionCellProps extends PropsWithRow<Service> {
  googleApiKey: string
}
const ActionCell = ({ row, googleApiKey }: ActionCellProps) => {
  return (
    <Flex align="center" gap="2">
      <DeleteServiceButton row={row} />
      <EditServiceButton row={row} googleApiKey={googleApiKey} />
    </Flex>
  )
}

export { ActionCell }
