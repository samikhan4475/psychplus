import { Pencil1Icon, PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, IconButton } from '@radix-ui/themes'
import { Practice } from '../../types'

interface AddOrganizationPracticeButtonProps {
  practiceData?: Practice
  isAddPractice?: boolean
}
const AddOrganizationPracticeButton = ({
  practiceData,
  isAddPractice,
}: AddOrganizationPracticeButtonProps) => {
  return (
    <Dialog.Trigger>
      {isAddPractice ? (
        <Button
          size="1"
          className="bg-pp-black-1 text-white h-[25px] w-[150px] cursor-pointer px-3 py-1.5"
        >
          <PlusIcon /> Add Practice
        </Button>
      ) : (
        <IconButton size="1" color="gray" variant="ghost">
          {!practiceData ? (
            <PlusCircledIcon
              width={16}
              height={16}
              className="text-pp-gray-1"
            />
          ) : (
            <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
          )}
        </IconButton>
      )}
    </Dialog.Trigger>
  )
}

export { AddOrganizationPracticeButton }
