'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { LevelCode } from '@/constants'
import { UserSetting } from '@/types'
import { DeleteAutoTextButton } from '../delete-auto-text-button'
import { EditAutoTextButton } from '../edit-auto-text-button'

const ActionCell = ({ row: { original } }: PropsWithRow<UserSetting>) => (
  <Flex gap="1">
    <EditAutoTextButton data={original} />
    {original?.levelCode !== LevelCode.System && (
      <DeleteAutoTextButton data={original} />
    )}
  </Flex>
)

export { ActionCell }
