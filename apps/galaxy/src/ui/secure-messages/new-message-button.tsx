import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const NewMessageButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      className="bg-pp-black-1 w-[115px] p-0 text-[12px]"
      size="1"
      type="button"
      onClick={onClick}
    >
      <PlusIcon />
      New Message
    </Button>
  )
}
export { NewMessageButton }
