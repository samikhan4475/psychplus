'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { addNoteDetails } from '@/features/note/actions'
import { NoteSectionName } from '@/features/note/constants'
import { useNoteStore } from '@/features/note/store'
import { NoteSectionItem } from '@/features/note/types'
import { useToast } from '@/providers'
import { ToggleableForm } from './toggleable-form'

type NoteFormContainerProps = React.PropsWithChildren<{
  getData: (schema: any) => NoteSectionItem[] | Promise<NoteSectionItem[]>
  onSave?: () => void
  isEdit?: boolean
}>

const NoteFormContainer = ({
  getData,
  onSave,
  isEdit,
  children,
}: NoteFormContainerProps) => {
  const { toast } = useToast()
  const form = useFormContext()
  const { saveNoteData } = useNoteStore((state) => ({
    saveNoteData: state.saveNoteData,
  }))

  const submitAction = async () => {
    const values = await getData(form.getValues())
    return addNoteDetails(values)
  }

  const onSuccess = (data: NoteSectionItem[]) => {
    toast({
      type: 'success',
      title: 'Saved',
    })

    saveNoteData(data, data[0].sectionName as NoteSectionName)

    onSave?.()
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={submitAction}
      onFormClose={onSave}
      onSuccess={onSuccess}
      isEdit={isEdit}
    >
      {children}
    </ToggleableForm>
  )
}
export { NoteFormContainer }
