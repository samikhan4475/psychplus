'use client'

import { FileIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { GET_NOTE_DOCUMENT_ENDPOINT } from '@/api/endpoints'
import { cn } from '@/utils'
import { downloadFile } from '@/utils/download'
import { NoteDocument } from '../types'

interface FileUploadCardProps {
  document: NoteDocument
}

const FileViewCard = ({ document }: FileUploadCardProps) => {
  const onPreview = async () => {
    await downloadFile(
      GET_NOTE_DOCUMENT_ENDPOINT(
        document.patientId,
        document.appointmentId,
        document.documentId,
      ),
      document.fileName ?? 'file',
      'POST',
      {},
    )
  }

  return (
    <Flex
      className={cn(
        `border-pp-gray-2 group h-[56px] w-[192px] cursor-pointer items-center rounded-[12px] border p-[12px]`,
      )}
      onClick={() => onPreview()}
    >
      <FileIcon className="text-pp-bg-primary mr-2" width="40" height="40" />
      <Flex direction="column">
        <Text
          weight="bold"
          className="line-clamp-1 w-[105px] overflow-hidden text-ellipsis text-[12px]"
        >
          {document.fileName}
        </Text>
      </Flex>
    </Flex>
  )
}

export { FileViewCard }
