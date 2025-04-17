import { Pencil1Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'
import { Practice } from '../../types'
interface AddOrganizationPracticeButtonProps {
  practiceData?: Practice
}
const AddOrganizationPracticeButton = ({ practiceData }: AddOrganizationPracticeButtonProps) => {
  return (
    <Dialog.Trigger>
      <IconButton size="1" color="gray" variant="ghost">
        {!practiceData ? (
          <PlusCircledIcon width={16} height={16} className="text-pp-gray-1" />
        ) : (
          <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
        )}
      </IconButton>
    </Dialog.Trigger>
  )
}

export { AddOrganizationPracticeButton }
