import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

interface ChargesHeaderActionProps {
  onAddNew: () => void
}

const ChargesHeaderAction = ({ onAddNew }: ChargesHeaderActionProps) => {
  return (
    <Flex gap="3" align="center" justify="end">
      <Button
        type="button"
        className="bg-[transparent] font-bold text-black"
        size="1"
        onClick={(e) => {
          e.stopPropagation()
          onAddNew()
        }}
      >
        <PlusCircledIcon />
        Add
      </Button>
    </Flex>
  )
}

export { ChargesHeaderAction }
