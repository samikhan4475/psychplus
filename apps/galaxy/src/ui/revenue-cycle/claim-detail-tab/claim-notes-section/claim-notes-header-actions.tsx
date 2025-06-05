import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { DeleteIcon } from '@/components/icons'

interface ClaimNotesHeaderActionProps {
  handleOpenModal: () => void
  handleOpenDeletedModal: () => void
}
const ClaimNotesHeaderActions = ({
  handleOpenModal,
  handleOpenDeletedModal,
}: ClaimNotesHeaderActionProps) => {
  return (
    <Flex gap="1" align="center" justify="end">
      <Button
        type="button"
        className="text-black bg-transparent"
        size="1"
        onClick={(e) => {
          e.stopPropagation()
          handleOpenDeletedModal()
        }}
      >
        <DeleteIcon />
        Deleted Notes
      </Button>
      <Text
        className="text-black border-pp-gray-2 rounded-md focus:bg-pp-gray-2 focus:text-black flex h-6 cursor-pointer items-center gap-1 bg-transparent p-3 text-2 !outline-none"
        onClick={(e) => {
          e.stopPropagation()
          handleOpenModal()
        }}
      >
        <PlusCircledIcon />
        Add Notes
      </Text>
    </Flex>
  )
}

export { ClaimNotesHeaderActions }
