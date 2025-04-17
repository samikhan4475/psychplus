import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'

const AddRoleButton = () => {
  return (
    <Dialog.Trigger>
      <Flex className="ml-auto w-[150px]">
        <Button
          size="1"
          className="bg-pp-black-1 text-white h-[25px] flex-1 cursor-pointer px-3 py-1.5"
        >
          <PlusIcon /> Add New Role
        </Button>
      </Flex>
    </Dialog.Trigger>
  )
}

export { AddRoleButton }
