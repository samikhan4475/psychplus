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
    const file = event.target.files?.[0]
    if (!file) {
      toast.error('No file selected.')
      return
    }

    form.setValue('file', file, { shouldDirty: true })

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'text/plain',
    ]
    if (!allowedTypes.includes(file.type)) {
      toast.error(
        'Invalid file type. Please upload a PDF, JPEG, PNG, or TXT file.',
      )

      return
    }
    event.target.value = ''
    toast.success('File selected successfully!')
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
      />
    </Button>
  )
}

export { CreateNoteUploadButton }
