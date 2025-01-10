import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'

const AddOrganizationPracticeButton = () => {
  return (
    <Dialog.Trigger>
      <IconButton size="1" color="gray" variant="ghost">
        <PlusCircledIcon width={16} height={16} className="text-pp-gray-1" />{' '}
      </IconButton>
    </Dialog.Trigger>
  )
}

export { AddOrganizationPracticeButton }
