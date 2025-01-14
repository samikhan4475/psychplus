import { Button } from '@radix-ui/themes'
import { Plus } from 'lucide-react'
import { AddForwardingMessageFormDialog } from './dialogs'

const AddForwardingButton = () => {
  return (
    <AddForwardingMessageFormDialog>
      <Button variant="solid" highContrast size="1">
        <Plus width={16} height={16} />
        Add Forwarding
      </Button>
    </AddForwardingMessageFormDialog>
  )
}

export { AddForwardingButton }
