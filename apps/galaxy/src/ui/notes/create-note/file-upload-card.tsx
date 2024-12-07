'use client'

import { FileIcon, TrashIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { cn } from '@/utils'
import { getFileSize } from './utils'

interface FileUploadCardProps {
  file: File
  onDelete: () => void
  onPreview: (file: File) => void
}

const FileUploadCard = ({ file, onDelete, onPreview }: FileUploadCardProps) => {
  return (
    <Flex
      className={cn(
        `border-pp-gray-2 group h-[56px] w-[192px] cursor-pointer items-center rounded-[12px] border p-[12px]`,
      )}
      onClick={() => onPreview(file)}
    >
      <FileIcon className="text-pp-bg-primary mr-2" width="40" height="40" />
      <Flex direction="column">
        <Text
          weight="bold"
          className="line-clamp-1 w-[105px] overflow-hidden text-ellipsis text-[12px]"
        >
          {file.name}
        </Text>
        <Text className="text-gray-500 text-[10px]">
          {getFileSize(file.size)}
        </Text>
      </Flex>
      <Tooltip content="Delete" side="top">
        <IconButton
          variant="ghost"
          color="red"
          type="button"
          className="trash-icon opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
        >
          <TrashIcon width="18" height="18" />
        </IconButton>
      </Tooltip>
    </Flex>
  )
}

export { FileUploadCard }
