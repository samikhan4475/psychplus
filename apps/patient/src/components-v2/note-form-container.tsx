'use client'

import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { addNoteDetails } from '@/features/note/actions'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { NoteSectionItem } from '@/features/note/types'
import { addNoteDetailsUnauthenticated } from '@/features/questionnaire/actions'
import { customToast, useToast } from '@/providers'
import { ToggleableForm } from './toggleable-form'

type NoteFormContainerProps = React.PropsWithChildren<{
  getData: (schema: any) => NoteSectionItem[] | Promise<NoteSectionItem[]>
  onSave?: () => Promise<void>
  onError?: () => Promise<void>
  isEdit?: boolean
  isExternalSavePressed?: boolean
  allowExternalSave?: boolean
  isUnauthenticated?: boolean
  noteType?: string
  patientId?: string
}>

const NoteFormContainer = ({
  getData,
  onSave,
  onError,
  isEdit,
  isExternalSavePressed,
  allowExternalSave,
  isUnauthenticated = false,
  noteType,
  patientId,
  children,
}: NoteFormContainerProps) => {
  const { toast } = useToast()
  const form = useFormContext()
  const { saveNoteData } = useNoteStore((state) => ({
    saveNoteData: state.saveNoteData,
  }))
  const noteCodesRef = useRef<NoteSectionItem[]>([])
  const noteDiagnosisRef = useRef<NoteSectionItem[]>([])

  const submitAction = async () => {
    noteCodesRef.current = []
    noteDiagnosisRef.current = []
    const values = await getData(form.getValues())
    noteCodesRef.current = values?.filter(
      (item) => item.sectionName === NoteSectionName.NoteSectionCodes,
    )
    noteDiagnosisRef.current = values?.filter(
      (item) => item.sectionName === NoteSectionName.NoteSectionDiagnosis,
    )
    const notes = values.filter(
      (item) =>
        ![
          NoteSectionName.NoteSectionCodes,
          NoteSectionName.NoteSectionDiagnosis,
        ].includes(item.sectionName as NoteSectionName),
    )

    return isUnauthenticated
      ? addNoteDetailsUnauthenticated(notes, noteType ?? '', patientId)
      : addNoteDetails(notes)
  }

  const onSuccess = async (data: NoteSectionItem[]) => {
    if (!allowExternalSave && !isUnauthenticated)
      toast({
        type: 'success',
        title: 'Saved',
      })

    if (!isUnauthenticated)
      await saveNoteData(data, data[0].sectionName as NoteSectionName)

    await Promise.all([
      handleNoteDetails(
        noteCodesRef.current,
        isUnauthenticated,
        noteType,
        patientId,
      ),
      handleNoteDetails(
        noteDiagnosisRef.current,
        isUnauthenticated,
        noteType,
        patientId,
      ),
    ])

    onSave?.()
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={submitAction}
      onSuccess={onSuccess}
      isEdit={isEdit}
      isExternalSavePressed={isExternalSavePressed}
      allowExternalSave={allowExternalSave}
      onError={onError}
    >
      {children}
    </ToggleableForm>
  )
}

const handleNoteDetails = async (
  data: NoteSectionItem[],
  isUnauthenticated?: boolean,
  noteType?: string,
  patientId?: string,
) => {
  if (data.length === 0) return

  const response = isUnauthenticated
    ? await addNoteDetailsUnauthenticated(
        data,
        noteType ?? '',
        patientId,
      )
    : await addNoteDetails(data)

  if (response.state === 'error' && !isUnauthenticated)
    customToast({
      type: 'error',
      title: response.error ?? 'Error while saving codes',
    })
}

export { NoteFormContainer }
