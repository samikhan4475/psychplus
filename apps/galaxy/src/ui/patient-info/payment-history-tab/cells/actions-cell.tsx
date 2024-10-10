'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { PatientTransaction } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionEdit } from './row-action-edit'

const ActionsCell = ({ row }: PropsWithRow<PatientTransaction>) => {
  return (
    row?.depth === 0 && (
      <Flex gap="1" justify="center" align="center">
        <RowActionEdit row={row} />
        <RowActionDelete row={row} />
      </Flex>
    )
  )
}

export { ActionsCell }
