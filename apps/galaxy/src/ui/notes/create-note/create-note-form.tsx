'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { createNoteSchema } from '.'
import { useStore } from '../store'
import { getCreateNoteAction } from './action/create-note-action'
import { fileUploadAction } from './action/file-upload-action'

const schema = createNoteSchema

type SchemaType = z.infer<typeof schema>

const CreateNoteForm = ({ children }: React.PropsWithChildren<unknown>) => {
  const { isCosigner, setIsCosigner } = useStore((state) => ({
    setIsCosigner: state.setIsCosigner,
    isCosigner: state.isCosigner,
  }))
  const searchParams = useSearchParams()
  const patientId = useParams().id as string
  const appointmentId = searchParams.get('id')

  const form = useForm<SchemaType>({
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      date: undefined,
      time: undefined,
      noteTypeCode: '',
      noteTitleCode: '',
      provider: undefined,
      cosigner: '',
      description: '',
      file: undefined,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const payload = {
      patientId: patientId,
      appointmentId: appointmentId,
      noteTypeCode: data.noteTypeCode,
      noteTitleCode: data.noteTitleCode,
      encounterSignedNoteDetails: [
        {
          sectionName: 'CreateNote',
          sectionItem: 'CreateNote',
          sectionItemValue: data.description || '',
        },
      ],
    }
    if (isCosigner) {
      setIsCosigner(false)
    }

    const result = await getCreateNoteAction({
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

      toast.success('Saved')
    } else {
      toast.error(result?.error || 'Failed to save')
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
