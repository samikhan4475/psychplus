'use client'

import { useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DOWNLOAD_QUICK_NOTE_DOCUMENT } from '@/api/endpoints'
import { PdfIcon } from '@/components/icons'
import { cn } from '@/utils'
import { downloadFile } from '@/utils/download'
import { Documents } from '../types'

interface UploadedDocumentsBlockProps {
  documents: Documents[]
  patientId: number
  appointmentId: number
}

const UploadedDocumentsBlock = ({
  documents,
  patientId,
  appointmentId,
}: UploadedDocumentsBlockProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  )

  const handleDownload = async (documentId: string, fileName: string) => {
    setLoading(true)
    setSelectedDocumentId(documentId)

    const formattedData = {
      appointmentId: appointmentId,
      patientId: patientId,
      documentType: 'Primary',
    }

    try {
      const endpoint = DOWNLOAD_QUICK_NOTE_DOCUMENT(
        patientId,
        appointmentId,
        documentId,
      )
      await downloadFile(endpoint, fileName, 'POST', formattedData)
    } catch (error) {
      toast.error(
        'There was an error downloading the document. Please try again.',
      )
    } finally {
      setLoading(false)
      setSelectedDocumentId(null)
    }
  }
  return (
    <Flex className="mt-0 p-1">
      {documents.length === 0 ? (
        <Flex className="w-full items-center justify-center">
          <Text size="1" weight="regular" className="text-gray-500">
            No document uploaded.
          </Text>
        </Flex>
      ) : (
        <Box className="flex flex-row flex-wrap gap-2">
          {documents.map((document) => (
            <Box
              key={document.id}
              className={cn(
                'rounded border-pp-gray-border/50 flex w-fit cursor-pointer items-center justify-between gap-1 rounded-[2px] border p-1 px-2 ',
                {
                  'bg-accent-2': selectedDocumentId === document.documentId,
                  'opacity-50':
                    loading && selectedDocumentId === document.documentId,
                },
              )}
              onClick={() =>
                document.documentId &&
                document.fileName &&
                handleDownload(document.documentId, document.fileName)
              }
            >
              <Box className="mr-1">
                <PdfIcon width={18} height={18} />
              </Box>
              <Text
                className="text-black ml-1 flex-1 truncate"
                size="2"
                weight="medium"
              >
                {document.fileName}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Flex>
  )
}

export { UploadedDocumentsBlock }
