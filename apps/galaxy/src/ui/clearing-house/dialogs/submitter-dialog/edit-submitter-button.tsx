import { Pencil1Icon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'

const EditSubmitterButton = () => {
  return (
    <Dialog.Trigger>
      <IconButton size="1" color="gray" variant="ghost">
        <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />{' '}
      </IconButton>
    </Dialog.Trigger>
  )
}

export { EditSubmitterButton }
