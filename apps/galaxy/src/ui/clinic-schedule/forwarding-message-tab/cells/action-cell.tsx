'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { EditForwardingButton } from '../edit-forwarding-button'
import { ForwardingMessage } from '../types'
import { CancelButtonCell } from './cancel-button-cell'

const ActionCell = ({ row: { original } }: PropsWithRow<ForwardingMessage>) => {
  return (
    <Flex gap="1">
      <EditForwardingButton forwardingMessage={original} />
      <CancelButtonCell forwardingMessage={original} />
    </Flex>
  )
}

export { ActionCell }
