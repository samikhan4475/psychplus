'use client'

import { useRef, useState } from 'react'
import { Button } from '@radix-ui/themes'
import { UploadIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { Facesheet } from '@/types'
import { uploadFacesheetAction } from './actions'

interface FacesheetUploadDialogProps {
  patientId: string
  onUploadSuccess: (newFacesheet: Facesheet) => void
}

const FacesheetUploadDialog = ({
  patientId,
  onUploadSuccess,
}: FacesheetUploadDialogProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]
    if (file) {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('patientId', patientId)
      try {
        const response = await uploadFacesheetAction({ patientId, formData })
        if (response.state === 'error') {
          toast.error('Upload failed: ' + response.error)
          return
        }
        onUploadSuccess(response.data)
        toast.success('Facesheet uploaded successfully')
      } catch (error) {
        toast.error('Could not upload image. Please try again later.')
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <Button
      size="1"
      highContrast
      onClick={() => fileInputRef.current?.click()}
      disabled={isUploading}
    >
      <input
        type="file"
        accept="image/png, image/jpeg, application/pdf"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <UploadIcon width={12} height={12} />
      Upload
    </Button>
  )
}

export { FacesheetUploadDialog }
