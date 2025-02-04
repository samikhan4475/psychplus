'use client'

import { useRef, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { UploadIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { cn, postEvent } from '@/utils'
import { uploadDocumentAction } from './actions'
import { QuickNoteSectionName, UPLOAD_BUTTON } from './constants'
import { useQuickNotesPermissions } from './hooks'
import { PermissionAlert } from './permission-alert'

interface QuickNotesUploadButtonProps {
  isWhiteBg?: boolean
  isIcon?: boolean
}

const QuickNotesUploadButton = ({
  isWhiteBg = false,
  isIcon = true,
}: QuickNotesUploadButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const { canUploadButtonQuickNotePage } = useQuickNotesPermissions()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const patientId = useParams().id as string
  const appointmentId = useSearchParams().get('id') as string

  const uploadFiles = async (files: FileList): Promise<boolean> => {
    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append('files', file))
    formData.append('PatientId', patientId)
    formData.append('AppointmentId', appointmentId)
    formData.append('documentType', 'Primary')

    const response = await uploadDocumentAction({
      data: formData,
      patientId: parseInt(patientId),
      appointmentId: parseInt(appointmentId),
    })

    if (response.state === 'success') {
      toast.success('Document uploaded successfully')
      postEvent({
        type: 'widget:save',
        widgetId: QuickNoteSectionName.QuicknoteSectionUploadedDocuments,
      })
      return true
    }

    toast.error(
      response.error ??
        'There was a problem uploading the document. Please try again.',
    )
    return false
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setIsUploading(true)
      const uploadSuccess = await uploadFiles(files)
      setIsUploading(!uploadSuccess)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <PermissionAlert
        isOpen={isOpen}
        message={alertMessage}
        onClose={() => {
          setIsOpen(false)
          setAlertMessage('')
        }}
      />
      <Button
        size="1"
        highContrast={isWhiteBg ? false : true}
        variant={isWhiteBg ? 'outline' : 'solid'}
        color={isWhiteBg ? 'gray' : 'blue'}
        onClick={() => {
          if (!canUploadButtonQuickNotePage) {
            setIsOpen(true)
            setAlertMessage(UPLOAD_BUTTON)
            return
          }
          triggerFileInput()
        }}
        disabled={isUploading}
        className={cn({ 'text-black': isWhiteBg })}
      >
        {isIcon && <UploadIcon height={14} width={14} strokeWidth={2} />}
        {isUploading ? 'Uploading' : 'Upload'}
      </Button>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </>
  )
}

export { QuickNotesUploadButton }
