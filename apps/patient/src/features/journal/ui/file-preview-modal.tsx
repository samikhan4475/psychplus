'use client'

import { Box, Button, Dialog, DialogContent, DialogTitle, Flex, Text } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'
import { type UnifiedAttachment } from '../types'

interface FilePreviewModalProps {
  selectedFile: UnifiedAttachment | null
  onClose: () => void
}

const FilePreviewModal = ({ selectedFile, onClose }: FilePreviewModalProps) => {
  const renderFilePreview = (file: UnifiedAttachment) => {
    const fileUrl = file.url || ''

    if (file.type.includes('image')) {
      return (
        <Image
          src={fileUrl}
          alt={file.name}
          width={500}
          height={500}
        />
      )
    }
    if (file.type.includes('pdf')) {
      return (
        <iframe
          src={fileUrl}
          width="100%"
          height="400px"
          title={file.name}
        />
      )
    }
    return (
      <Box className="p-4 text-center">
        <Text size="3">Preview not available for this file type</Text>
        <Text size="2" className="text-gray-500 mt-2">
          File: {file.name}
        </Text>
      </Box>
    )
  }

  return (
    <Dialog.Root open={!!selectedFile} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogTitle>{selectedFile?.name}</DialogTitle>
        <Box className="mt-4">
          {selectedFile && renderFilePreview(selectedFile)}
        </Box>
        <Flex justify="end" className="mt-4">
          <Button type="button" variant="outline" highContrast color="gray" className="w-28" onClick={onClose}>
            Cancel
          </Button>
        </Flex>
      </DialogContent>
    </Dialog.Root>
  )
}

export default FilePreviewModal 