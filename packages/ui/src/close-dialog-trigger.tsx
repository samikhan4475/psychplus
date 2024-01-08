import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog } from './dialog'

const CloseDialogTrigger = () => {
  return (
    <Dialog.Close>
      <Cross1Icon
        height={24}
        width={24}
        className="absolute right-4 top-4 cursor-pointer text-gray-8 transition-colors hover:text-gray-11"
      />
    </Dialog.Close>
  )
}

export { CloseDialogTrigger }
