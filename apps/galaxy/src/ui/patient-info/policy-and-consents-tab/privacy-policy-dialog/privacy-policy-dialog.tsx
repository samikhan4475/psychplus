import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { Pen } from '@/components/icons'
import { ActionItem } from '../cells/action-item'
import { RowActionProps } from '../types'
import { PrivacyPolicyDialogContent } from './privacy-policy-dialog-content'

const PrivacyPolicyDialog = (props: RowActionProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <ActionItem Icon={Pen} disabled={props.disabled} />
      </Dialog.Trigger>
      <Dialog.Content className="max-w-[824px]">
        <PrivacyPolicyDialogContent
          {...props}
          handleUpdateOpenState={setOpen}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PrivacyPolicyDialog }
