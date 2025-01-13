'use client'

import { useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Button } from '@radix-ui/themes'
import { PenLineIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useStore } from '../store'
import { fileUploadAction } from './action/file-upload-action'
import { getSignNoteAction } from './action/sign-note-action'
import { formatDateTime } from './utils'

const CreateNoteSignButton = () => {
  const [loading, setLoading] = useState(false)
  const { getValues, trigger } = useFormContext()
  const searchParams = useSearchParams()
  const patientId = useParams().id as string
  const appointmentId = searchParams.get('id')
  const form = useFormContext()
  const { setIsCosigner } = useStore((state) => ({
    setIsCosigner: state.setIsCosigner,
  }))

  const handleSign = async () => {
    const data = getValues()
    setLoading(true)
    const isValid = await trigger()
    if (!isValid || !data.cosigner) {
      if (!data.cosigner) {
        setIsCosigner(true)
      }
      setLoading(false)
      return
    }

    const formattedDateTime = formatDateTime(data)

    const payload = {
      patientId: patientId,
      appointmentId: appointmentId,
      signedByUserId: data.provider,
      noteTypeCode: data.noteTypeCode,
      noteTitleCode: data.noteTitleCode,
      coSignedByUserId: data.cosigner,
      signedDate: formattedDateTime,
      encounterSignedNoteDetails: [
        {
          sectionName: 'CreateNote',
          sectionItem: 'CreateNote',
          sectionItemValue: data.description || '',
        },
      ],
    }

    const result = await getSignNoteAction({
      patientId,
      appointmentId,
      payload,
    })

    if (result.state === 'success') {
      if (data.file) {
        const formData = new FormData()

        data.file.forEach((file: File) => {
          formData.append('files', file)
        })
        formData.append('documentType', 'Secondary')
        formData.append('patientId', patientId)
        formData.append('appointmentId', appointmentId as string)

        const fileUploadResult = await fileUploadAction({
          data: formData,
          patientId: patientId,
          appointmentId: appointmentId,
        })

        if (fileUploadResult.state !== 'success') {
          toast.error(`Error uploading file: ${fileUploadResult.error}`)
          return
        }
      }

      toast.success('Signed')
      form?.reset()
      setLoading(false)
    } else {
      toast.error('Failed to signed')
      setLoading(false)
    }
  }

  return (
    <Button
      size="1"
      highContrast
      type="button"
      onClick={handleSign}
      disabled={loading}
    >
      <PenLineIcon height={14} width={14} strokeWidth={2} />
      Sign
    </Button>
  )
}

export { CreateNoteSignButton }
