import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'

const NewEmailButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      className="bg-pp-black-1 w-[92px] p-0 text-[12px]"
      size="1"
      type="button"
      onClick={onClick}
    >
      <PlusIcon className="h-[16px] w-[16px]" />
      New Email
    </Button>
  )
}
export { NewEmailButton }
