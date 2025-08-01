'use client'

import { FileIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { GET_NOTE_DOCUMENT_ENDPOINT } from '@/api/endpoints'
import { QuickNoteSectionItem } from '@/types'
import { bytesToMegaBytes } from '@/ui/secure-messages/utils'
import { cn } from '@/utils'
import { downloadFile } from '@/utils/download'
import { useStore } from '../store'

interface FileUploadCardProps {
  document: QuickNoteSectionItem
}

const FileViewCard = ({ document }: FileUploadCardProps) => {
  const [, id, size] = document.sectionItem.split(',')
  const { noteDetail } = useStore((state) => ({
    noteDetail: state.noteDetail,
  }))

  const onPreview = async () => {
    await downloadFile(
      GET_NOTE_DOCUMENT_ENDPOINT(
        String(noteDetail?.[0].patientId),
        String(noteDetail?.[0].appointmentId),
        id,
      ),
      document.sectionItemValue ?? 'file',
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
          {document.sectionItemValue}
        </Text>
        {size && (
          <Text className="text-gray-500 text-[10px]">{`${bytesToMegaBytes(
            Number(size),
          )} MB`}</Text>
        )}
      </Flex>
    </Flex>
  )
}

export { FileViewCard }
