'use client'

import React, { useRef, useState } from 'react'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { PictureIcon } from '@/components/icons'
import { uploadPreferredPartnerUsersAction, type FileFormat } from '../actions'

interface PreferredPartnerUserUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  ppid: string
  onUploadSuccess: () => void
}

const PreferredPartnerUserUploadDialog: React.FC<
  PreferredPartnerUserUploadDialogProps
> = ({ isOpen, onClose, ppid, onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileFormat = (file: File): FileFormat | null => {
    const extension = file.name.toLowerCase().split('.').pop()
    const mimeType = file.type.toLowerCase()

    if (
      extension === 'xlsx' ||
      mimeType ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return 'Xlsx'
    }
    if (extension === 'xls' || mimeType === 'application/vnd.ms-excel') {
      return 'Xlsx'
    }

    return null
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileFormat = getFileFormat(file)

      if (!fileFormat) {
        toast.error(
          'Please select a valid Excel file (.xlsx or .xls)',
        )
        return
      }

      setSelectedFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)

    const files = event.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const fileFormat = getFileFormat(file)

      if (!fileFormat) {
        toast.error(
          'Please select a valid Excel file (.xlsx or .xls)',
        )
        return
      }

      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload')
      return
    }

    const fileFormat = getFileFormat(selectedFile)
    if (!fileFormat) {
      toast.error('Unsupported file format')
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('partnerId', ppid)
      formData.append('fileFormat', fileFormat)

      const response = await uploadPreferredPartnerUsersAction({
        ppid,
        fileFormat,
        data: formData,
      })

      if (response.state === 'success') {
        toast.success('Users uploaded successfully')
        onUploadSuccess()
        handleClose()
      } else {
        toast.error(response.error || 'Upload failed')
      }
    } catch {
      toast.error('An error occurred during upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onClose()
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isUploading) {
          handleClose()
        }
      }}
    >
      <Dialog.Content className="relative max-w-[1000px] rounded-1 p-6">
        <Dialog.Close
          className="absolute right-6 top-6 cursor-pointer"
          disabled={isUploading}
        >
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>

        <Dialog.Title size="5" className="mb-4 font-[600]">
          Upload Excel Sheet
        </Dialog.Title>

        <Flex direction="column" gap="6" className="w-full p-40">
          <Flex direction="column" className="mx-auto w-3/4">
            <div className="w-full">
              <Text size="3" className="mb-4 block text-left font-medium">
                Let&apos;s Collect your Users Data
              </Text>
            </div>

            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="4"
              className={` border-pp-gray-2  hover:border-gray-300 m-4 w-fit cursor-pointer rounded-2 border-2 border-dashed p-12 transition-all duration-200   ${
                isDragOver ? 'border-blue-400 bg-blue-50' : 'bg-gray-50/30'
              }`}
              onClick={triggerFileInput}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <PictureIcon width={100} height={100} />

              {selectedFile ? (
                <Flex
                  direction="column"
                  align="center"
                  gap="2"
                  className="text-center"
                >
                  <Text size="3" weight="medium">
                    {selectedFile.name}
                  </Text>
                  <Text size="2" color="gray">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </Flex>
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  gap="2"
                  className="px-4 text-center"
                >
                  <Text size="3" weight="medium">
                    Drag the file here or browse for a file to upload
                  </Text>
                </Flex>
              )}
            </Flex>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
          </Flex>
        </Flex>

        <Flex gap="4" justify="end" className="w-full px-6 pb-6">
          <Button
            variant="soft"
            color="gray"
            onClick={handleClose}
            disabled={isUploading}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            loading={isUploading}
            className="px-6"
          >
            <Upload size={16} className="mr-2" />
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PreferredPartnerUserUploadDialog }
