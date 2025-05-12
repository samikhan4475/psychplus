import { ComponentProps } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, Flex } from '@radix-ui/themes'

const CloseDialogTrigger = ({
  onClick,
}: ComponentProps<typeof Dialog.Close>) => (
  <Dialog.Close
    className="absolute right-3 top-3 cursor-pointer"
    onClick={onClick}
  >
    <Flex
      align="center"
      justify="center"
      className="rounded-full h-[35px] w-[35px] text-gray-11 transition-colors hover:bg-gray-3"
    >
      <Cross1Icon width={20} height={20} strokeWidth={1.5} />
    </Flex>
  </Dialog.Close>
)

export { CloseDialogTrigger }
