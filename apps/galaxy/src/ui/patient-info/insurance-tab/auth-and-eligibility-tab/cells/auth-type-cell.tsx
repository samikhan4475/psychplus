'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { AuthTable } from '../../types'

const AuthTypeCell = ({ row }: PropsWithRow<AuthTable>) => {
  return (
    <Flex className="p-0.5" width="100%">
      <SelectCell
        className="w-full"
        value="referral"
        options={[
          { value: 'referral', label: 'Referral' },
          { value: 'auth', label: 'Auth' },
        ]}
      />
    </Flex>
  )
}

export { AuthTypeCell }
