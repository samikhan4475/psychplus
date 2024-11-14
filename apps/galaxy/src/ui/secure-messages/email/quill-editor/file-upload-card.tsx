import { FileIcon, TrashIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Spinner, Text, Tooltip } from '@radix-ui/themes'
import { DOWNLOAD_ATTACHMENTS_FILE_SECURE_MESSAGE } from '@/api/endpoints'
import { cn } from '@/utils'
import { downloadFile } from '@/utils/download'
import { useStore } from '../../store'
import { ActiveComponent, Attachment, FileTileProps } from '../../types'
import { bytesToMegaBytes } from '../../utils'
import { ErrorBadge } from './error-badge'

const FileUploadCard = ({
  attachment,
  handleDeleteFile,
  viewMessage,
  uploading = false,
  deleting = false,
}: FileTileProps) => {
  const { activeComponent } = useStore((state) => state)
  const hasError = false
  const isPreviewEmail = activeComponent === ActiveComponent.PREVIEW_EMAIL
  const isFile = (
    attachment: Partial<Attachment> | File,
  ): attachment is File => {
    return (attachment as File).size !== undefined
  }
  const downloadAttachment = async () => {
    if (attachment.messageId && attachment.id && viewMessage) {
      await downloadFile(
        DOWNLOAD_ATTACHMENTS_FILE_SECURE_MESSAGE(
          attachment.messageId,
          attachment.id,
        ),
        attachment.name ?? 'file',
        'POST',
        {},
      )
    }
  }
  return (
    <Flex
      onClick={downloadAttachment}
      className={cn(
        `group h-[56px] w-[192px] cursor-pointer items-center rounded-[12px] border p-[12px]`,
        isPreviewEmail && 'justify-between',
        hasError
          ? 'border-pp-states-error text-pp-states-error'
          : 'border-pp-gray-4 bg-pp-bg-table-cell',
      )}
    >
      {uploading || deleting ? (
        <Spinner className="mr-2" />
      ) : (
        <FileIcon className="text-pp-bg-primary mr-2" width="40" height="40" />
      )}
      <Flex direction="column" className="">
        <Text
          weight="bold"
          className="line-clamp-1 w-[105px] overflow-hidden text-ellipsis text-[12px]"
        >
          {attachment.name}
        </Text>
        <Flex className="items-center" gap="1">
          <Text className="text-[12px]" color="gray">
            {`${
              isFile(attachment) ? bytesToMegaBytes(attachment.size) : ''
            } MB`}
          </Text>
          <Text className="text-[12px]" color="gray">
            .
          </Text>
          {hasError && <ErrorBadge />}
        </Flex>
      </Flex>
      {!isPreviewEmail && (
        <Tooltip content="Delete" side="top">
          <IconButton
            variant="ghost"
            color="red"
            type="button"
            className="trash-icon opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            disabled={uploading || deleting}
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteFile()
            }}
          >
            <TrashIcon width="18" height="18" />
          </IconButton>
        </Tooltip>
      )}
    </Flex>
  )
}

export { FileUploadCard }
