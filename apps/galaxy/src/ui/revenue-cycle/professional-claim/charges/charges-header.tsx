import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

interface ChargesHeaderProps {
  onAddNew: () => void
}

const ChargesHeader = ({ onAddNew }: ChargesHeaderProps) => {
  return (
    <Flex gap="3" align="center" justify="end">
      <Button
        type="button"
        size="1"
        className="bg-white text-black shadow-ss-gray"
        onClick={(e) => {
          e.stopPropagation()
          onAddNew()
        }}
      >
        <PlusIcon /> Add New
      </Button>
    </Flex>
  )
}

export { ChargesHeader }
