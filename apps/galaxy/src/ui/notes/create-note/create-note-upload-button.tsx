'use client'

import { useRef } from 'react'
import { Button } from '@radix-ui/themes'
import { UploadIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

const CreateNoteUploadButton = () => {
  const form = useFormContext()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error('No File(s) Uploaded Successfully')
      return
    }

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'text/plain',
    ]

    const existingFiles = form.getValues('file') || []
    const existingFileNames = existingFiles.map((file: File) => file.name)
    const newFiles = Array.from(selectedFiles).filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is an invalid file type.`)
        return false
      }
      if (existingFileNames.includes(file.name)) {
        toast.error(`${file.name} is already uploaded.`)
        return false
      }
      return true
    })

    if (newFiles.length === 0) return

    form.setValue('file', [...existingFiles, ...newFiles], {
      shouldDirty: true,
    })
    toast.success('File(s) Uploaded Successfully')

    event.target.value = ''
  }

  return (
    <Button
      variant="outline"
      color="gray"
      size="1"
      className="text-black"
      type="button"
      onClick={handleUploadClick}
    >
      <UploadIcon height={14} width={14} strokeWidth={2} />
      Upload
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept=".pdf, .txt, image/*"
        multiple
      />
    </Button>
  )
}

export { CreateNoteUploadButton }
