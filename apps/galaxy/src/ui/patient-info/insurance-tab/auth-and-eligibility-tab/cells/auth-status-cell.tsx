'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { AuthTable } from '../../types'

const AuthStatusCell = ({ row }: PropsWithRow<AuthTable>) => {
  return (
    <Flex className="p-0.5" width="100%">
      <SelectCell
        className="w-full"
        value="active"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ]}
      />
    </Flex>
  )
}

export { AuthStatusCell }
