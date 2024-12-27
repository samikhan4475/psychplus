'use client'

import { PdfIcon } from '@/components/icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { Documents } from '../types'
import toast from 'react-hot-toast'
import { DOWNLOAD_QUICK_NOTE_DOCUMENT } from '@/api/endpoints'
import { downloadFile } from '@/utils/download'
import { useState } from 'react'
import { cn } from '@/utils'

interface UploadedDocumentsBlockProps {
  documents: Documents[]
  patientId: number
  appointmentId: number
}

const UploadedDocumentsBlock = ({ documents, patientId, appointmentId }: UploadedDocumentsBlockProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const handleDownload = async (documentId: string, fileName: string) => {
    setLoading(true);
    setSelectedDocumentId(documentId);

    let formattedData = {
      appointmentId: appointmentId,
      patientId: patientId,
      documentType: 'Primary',
    }

    try {
      const endpoint = DOWNLOAD_QUICK_NOTE_DOCUMENT(patientId, appointmentId, documentId);
      await downloadFile(endpoint, fileName, 'POST', formattedData);
    } catch (error) {
      toast.error('There was an error downloading the document. Please try again.');
    } finally {
      setLoading(false);
      setSelectedDocumentId(null);
    }
  };
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
                'rounded flex items-center justify-between border p-1 w-fit gap-1 px-2 border-pp-gray-border/50 rounded-[2px] cursor-pointer ',
                {
                  'bg-accent-2': selectedDocumentId === document.documentId,
                  'opacity-50': loading && selectedDocumentId === document.documentId,
                }
              )}
              onClick={() => document.documentId && document.fileName && handleDownload(document.documentId, document.fileName)}
            >
              <Box className="mr-1">
                <PdfIcon width={18} height={18} />
              </Box>
              <Text className="text-black flex-1 truncate ml-1" size="2" weight="medium">
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
