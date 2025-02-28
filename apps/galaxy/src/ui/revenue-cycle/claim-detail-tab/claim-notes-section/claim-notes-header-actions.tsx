import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
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
      <Button
        type="button"
        className="text-black bg-transparent"
        size="1"
        onClick={(e) => {
          e.stopPropagation()
          handleOpenModal()
        }}
      >
        <PlusCircledIcon />
        Add Notes
      </Button>
    </Flex>
  )
}

export { ClaimNotesHeaderActions }
