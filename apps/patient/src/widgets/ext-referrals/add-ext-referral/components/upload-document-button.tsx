'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Button, Flex, Text } from '@radix-ui/themes'

interface UploadDocumentButtonsProps {
  onFileChange: (file: File | undefined) => void
  disableControls?: boolean
  accept?: string | string[]
  label?: string
  resetTrigger?: number
}

const UploadDocumentButton = ({
  onFileChange,
  label,
  accept,
  resetTrigger,
  disableControls = false,
}: UploadDocumentButtonsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | undefined>(undefined)

  useEffect(() => {
    setFile(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [resetTrigger])

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setFile(selectedFile)
    onFileChange(selectedFile)
  }

  return (
    <Flex direction="column" gap="2">
      <Text size="2" weight="medium">
        {label}
      </Text>
      <input
        type="file"
        accept={Array.isArray(accept) ? accept?.join(',') : accept}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        type="button"
        onClick={handleFileInputClick}
        className="text-black border-pp-gray-2 h-[29px] w-full  border border-solid px-2 hover:bg-transparent"
        variant="ghost"
        disabled={disableControls}
      >
        {file?.name ?? 'Upload File'}
      </Button>
    </Flex>
  )
}

export { UploadDocumentButton }
