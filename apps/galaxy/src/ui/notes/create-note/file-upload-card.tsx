import { FileIcon, TrashIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { CreateNoteSchema } from './schema'

const FileUploadCard = () => {
  const form = useFormContext<CreateNoteSchema>()
  const handleDeleteFile = () => {
    form.reset()
  }
  return (
    <Flex
      className={cn(
        `border-pp-gray-2 group h-[56px] w-[192px] cursor-pointer items-center rounded-[12px] border p-[12px]`,
      )}
    >
      <FileIcon className="text-pp-bg-primary mr-2" width="40" height="40" />
      <Flex direction="column" className="">
        <Text
          weight="bold"
          className="line-clamp-1 w-[105px] overflow-hidden text-ellipsis text-[12px]"
        >
          {form.getValues('file')?.name}
        </Text>
        <Flex className="items-center" gap="1">
          <Text className="text-[12px]" color="gray"></Text>
        </Flex>
      </Flex>
      <Tooltip content="Delete" side="top">
        <IconButton
          variant="ghost"
          color="red"
          type="button"
          className="trash-icon opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteFile()
          }}
        >
          <TrashIcon width="18" height="18" />
        </IconButton>
      </Tooltip>
    </Flex>
  )
}

export { FileUploadCard }
