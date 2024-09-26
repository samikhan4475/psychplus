import React from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { PdfIcon } from '@/components/icons'
import { cn } from '@/utils'
import { ActiveComponent, FileTileProps } from '../../types'
import { bytesToMegaBytes } from '../../utils'
import { ErrorBadget } from './error-badget'

const FileUplaodCard = ({
  attachment,
  handleDeleteFile,
  activeComponent,
}: FileTileProps) => {
  const hasError = false
  const isPreviewEmail = activeComponent !== ActiveComponent.PREVIEW_EMAIL

  return (
    <Flex
      className={cn(
        `group h-[56px] w-[192px] cursor-pointer items-center  rounded-[12px] border p-[12px]`,
        isPreviewEmail && 'justify-between',
        hasError
          ? 'border-pp-states-error text-pp-states-error'
          : 'border-pp-gray-4 bg-pp-bg-table-cell',
      )}
    >
      <PdfIcon className="mr-2" />
      <Flex direction="column" className="">
        <Text
          weight="bold"
          className="line-clamp-1 overflow-hidden text-ellipsis text-[12px]"
        >
          {attachment.name}
        </Text>
        <Flex className="items-center" gap="1">
          <Text className="text-[12px]" color="gray">
            {`${bytesToMegaBytes(attachment.size)} MB`}
          </Text>
          <Text className="text-[12px]" color="gray">
            .
          </Text>
          {hasError && <ErrorBadget />}
        </Flex>
      </Flex>
      {isPreviewEmail && (
        <Tooltip content="Delete" side="top">
          <IconButton
            variant="ghost"
            color="red"
            className="trash-icon opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            onClick={() => handleDeleteFile()}
          >
            <TrashIcon width="18" height="18" />
          </IconButton>
        </Tooltip>
      )}
    </Flex>
  )
}

export { FileUplaodCard }
