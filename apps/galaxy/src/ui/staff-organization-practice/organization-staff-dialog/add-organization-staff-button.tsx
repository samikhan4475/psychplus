import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'

const AddOrganizationStaffButton = () => {
  return (
    <Dialog.Trigger>
      <Flex className="ml-auto w-[120px]">
        <Button
          size="1"
          className="bg-pp-black-1 text-white h-[25px] flex-1 cursor-pointer px-3 py-1.5"
        >
          <PlusIcon /> Add Staff
        </Button>
      </Flex>
    </Dialog.Trigger>
  )
}

export { AddOrganizationStaffButton }
