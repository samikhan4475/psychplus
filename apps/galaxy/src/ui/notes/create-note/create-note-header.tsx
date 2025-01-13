import { Flex, IconButton, Text } from '@radix-ui/themes'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/utils'
import { useStore } from '../store'
import { CreateNoteClearButton } from './create-note-clear-button'
import { CreateNotePrintButton } from './create-note-print-button'
import { CreateNoteSignButton } from './create-note-sign-button'
import { CreateNoteUploadButton } from './create-note-upload-button'
import { SaveButton } from './save-button'

const secondaryButtonClasses = 'shadow-2 h-6 text-black'

const CreateNoteHeader = ({ id }: { id: string }) => {
  const { setIsCreateNoteView, setSelectedRow } = useStore((state) => ({
    setIsCreateNoteView: state.setIsCreateNoteView,
    setSelectedRow: state.setSelectedRow,
  }))

  const clearNoteViewState = () => {
    setIsCreateNoteView(false)
    setSelectedRow(undefined)
  }

  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white rounded-b-[4px] rounded-t-[4px] px-2 py-1 shadow-2"
    >
      <Flex className="gap-x-[11px]" align="center">
        <IconButton
          className={cn(secondaryButtonClasses, '[box-shadow:none]')}
          variant="outline"
          color="gray"
          type="button"
          onClick={() => clearNoteViewState()}
        >
          <ChevronLeft width={24} height={24} />
        </IconButton>
        <Text className="text-pp-black-1 text-[20px] font-bold">
          Create Note
        </Text>
      </Flex>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <CreateNotePrintButton id={id} />
        <CreateNoteClearButton />
        <CreateNoteUploadButton />
        <SaveButton />
        <CreateNoteSignButton />
      </Flex>
    </Flex>
  )
}

export { CreateNoteHeader }
