'use client'

import { CrossIcon } from '@/components'
import { useProfileStore } from '@/features/account/profile/store'
import { cn } from '@psychplus/ui/cn'
import { DownloadIcon, FileIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { useJournalActions } from '../hooks'
import { useStore } from '../store'
import { type UnifiedAttachment } from '../types'

interface FileAttachmentListProps {
  disabled?: boolean
  onFileClick: (file: UnifiedAttachment) => void
}

const FileAttachmentList = ({
  disabled = false,
  onFileClick,
}: FileAttachmentListProps) => {
  const { downloadAttachment, deleteAttachment } = useJournalActions()

  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  const patientId = profile?.id ? String(profile.id) : ''

  const {
    formData,
  } = useStore((state) => ({
    formData: state.formData,
    setFormData: state.setFormData,
    currentJournalId: state.currentJournalId,
  }))

  const attachments = formData.attachments

  const handleDownload = async (attachment: UnifiedAttachment) => {
    await downloadAttachment(
      attachment,
      patientId,
    )
  }

  const handleDelete = async (attachment: UnifiedAttachment) => {
    await deleteAttachment(
      attachment,
      patientId,
    )
  }

  if (attachments.length === 0) {
    return null
  }

  return (
    <Flex gap="2" align="center" className="w-full p-2 sm:p-4 flex-wrap border-t border-t-pp-gray-2">
      <Text size={{ initial: '2', sm: '3' }} weight="medium" className="mr-3">
        Attached Files ({attachments.length}/5)
      </Text>
      {attachments.map((file) => (
        <Flex
          key={file.id}
          gap="2"
          align="center"
          className={cn(
            "border-pp-gray-2 mr-3 rounded-5 border px-2 py-1 hover:bg-gray-50",
          )}
        >
          <FileIcon className="text-gray-500 w-3 h-3" />
          <Text
            size={{ initial: '1', sm: '2' }}
            weight={'medium'}
            className={cn(
              "whitespace-nowrap cursor-pointer hover:text-blue-600",
            )}
            onClick={() => {
              if (file.isExisting) {
                handleDownload(file)
              } else if (!disabled) {
                onFileClick(file)
              }
            }}
          >
            {file.name.slice(0, 20).concat(file.name.length > 20 ? '...' : '')}
          </Text>
          <Text size={{ initial: '1', sm: '2' }} className="text-gray-500">
            {file.type}
          </Text>
          <Button
            variant="ghost"
            size="1"
            onClick={() => handleDownload(file)}
            className="text-gray-500 hover:text-blue-600"
          >
            <DownloadIcon className="w-3 h-3" />
          </Button>
          {!disabled && (
            <Box
              className="cursor-pointer text-gray hover:text-red-500"
              onClick={() => {
                handleDelete(file)
              }}
            >
              <CrossIcon width={10} height={10} />
            </Box>
          )}
        </Flex>
      ))}
    </Flex>
  )
}

export default FileAttachmentList 