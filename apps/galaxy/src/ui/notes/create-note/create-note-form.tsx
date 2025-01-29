'use client'

import { PropsWithChildren } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDate, now, Time } from '@internationalized/date' // Make sure you're using this library correctly
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { Appointment } from '@/types'
import { sanitizeFormData } from '@/utils'
import { createNoteSchema } from '.'
import { useStore } from '../store'
import { NoteDocumentsItemList } from '../types'
import { fileUploadAction } from './action/file-upload-action'
import { getSignNoteAction } from './action/sign-note-action'
import { mapToUTCString } from './utils'

const schema = createNoteSchema

type SchemaType = z.infer<typeof schema>

interface Props extends PropsWithChildren {
  noteAppointment: Appointment
}

const CreateNoteForm = ({ children, noteAppointment }: Props) => {
  const { setIsCreateNoteView, setSelectedRow, fetch } = useStore((state) => ({
    setIsCreateNoteView: state.setIsCreateNoteView,
    setSelectedRow: state.setSelectedRow,
    fetch: state.fetch,
  }))
  const searchParams = useSearchParams()
  const patientId = useParams().id as string
  const appointmentId = searchParams.get('id')
  const currentTime = now(noteAppointment?.locationTimezoneId ?? '')
  const defaultDate = new CalendarDate(
    currentTime.year,
    currentTime.month,
    currentTime.day,
  )
  const defaultTime = new Time(currentTime.hour, currentTime.minute)

  const form = useForm<SchemaType>({
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      date: defaultDate,
      time: defaultTime,
      noteTypeCode: '',
      noteTitleCode: '',
      provider: undefined,
      cosigner: '',
      description: '',
      file: undefined,
    },
  })

  const createPayload = (noteDocuments: NoteDocumentsItemList[] = []) => {
    const data = form.getValues()

    const formattedDateTime = mapToUTCString(
      `${data.date}T${data.time}[${noteAppointment?.locationTimezoneId}]`,
    )

    return {
      patientId,
      appointmentId,
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
        ...noteDocuments,
      ],
    }
  }

  const handleFileUpload = async () => {
    const data = form.getValues()
    const noteDocuments: NoteDocumentsItemList[] = []
    const formData = new FormData()

    data?.file?.forEach((file: File) => {
      formData.append('files', file)
    })
    formData.append('documentType', 'Secondary')
    formData.append('patientId', patientId)
    formData.append('appointmentId', appointmentId as string)

    const fileUploadResult = await fileUploadAction({
      data: formData,
      patientId,
      appointmentId,
    })

    if (fileUploadResult.state !== 'success') {
      toast.error(`Error uploading file: ${fileUploadResult.error}`)
      return []
    }

    fileUploadResult.data?.forEach((file) => {
      noteDocuments.push({
        sectionName: 'UploadDocument',
        sectionItem: `Secondary, ${file.documentId}, ${file.encounterDocumentSizeInBytes}`,
        sectionItemValue: file.fileName,
      })
    })

    return noteDocuments
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    let noteDocuments: NoteDocumentsItemList[] = []
    if (data.file) {
      noteDocuments = await handleFileUpload()
      if (noteDocuments.length === 0) return
    }

    const payload = createPayload(noteDocuments)

    const cleanedPayload = sanitizeFormData(payload)

    const result = await getSignNoteAction({
      patientId,
      appointmentId,
      payload: cleanedPayload,
    })

    if (result.state === 'success') {
      toast.success('Signed')
      form.reset()
      setIsCreateNoteView(false)
      setSelectedRow(undefined)
      fetch({ patientId })
    } else {
      toast.error(`Error signing note: ${result.error}`)
    }
  }
  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" className="flex-1 gap-[2px] overflow-auto p-1">
        {children}
      </Flex>
    </FormContainer>
  )
}

export { CreateNoteForm, type SchemaType }
