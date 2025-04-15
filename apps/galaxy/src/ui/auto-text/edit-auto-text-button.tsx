'use client'

import { Dialog, IconButton, Tooltip } from '@radix-ui/themes'
import { TableEditIcon } from '@/components/icons'
import { UserSetting } from '@/types'
import { AutoTextDialog } from './auto-text-dialog'

interface EditAutoTextButtonProps {
  data: UserSetting
}
const EditAutoTextButton = ({ data }: EditAutoTextButtonProps) => {
  return (
    <AutoTextDialog title="Edit Auto Text" data={data}>
      <Tooltip content="Edit">
        <Dialog.Trigger>
          <IconButton
            variant="ghost"
            className="!m-0"
            size="1"
            color="gray"
            highContrast
          >
            <TableEditIcon width={16} height={16} />
          </IconButton>
        </Dialog.Trigger>
      </Tooltip>
    </AutoTextDialog>
  )
}

export { EditAutoTextButton }
