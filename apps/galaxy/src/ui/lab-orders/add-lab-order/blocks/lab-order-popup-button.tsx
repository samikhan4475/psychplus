import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Text } from '@radix-ui/themes'

const LabOrderPopupButton = ({
  setOpen,
}: {
  setOpen: (value: boolean) => void
}) => {
  return (
    <Button
      className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
      type="button"
      onClick={() => setOpen(true)}
    >
      <PlusIcon color="#8B8D98" />
      <Text className="text-pp-black-3 text-1">Add Lab Order</Text>
    </Button>
  )
}

export { LabOrderPopupButton }
