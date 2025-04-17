import { Button, Dialog } from '@radix-ui/themes'
import { CopyIcon } from 'lucide-react'

const AddRoleButton = () => {
  return (
    <Dialog.Trigger>
      <Button
        color="gray"
        className="text-black"
        size="1"
        variant="outline"
        type="button"
        name="copy"
      >
        <CopyIcon width={16} height={16} />
        Copy From
      </Button>
    </Dialog.Trigger>
  )
}

export { AddRoleButton }
