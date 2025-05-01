'use client'

import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { updateCodesetCode } from '@/ui/assigning-authorities/actions'
import { useStore } from '@/ui/assigning-authorities/store'
import { Code } from '@/ui/assigning-authorities/types'
import { SaveButton } from '../buttons'
import { SchemaType } from '../code-schema'

const EditableRowActionSave = ({ row }: PropsWithRow<Code>) => {
  const {
    selectedAssigningAuthority,
    saving,
    setSaving,
    selectedCodesetCodes,
    updateCurrentPageData,
  } = useStore()
  const form = useFormContext<SchemaType>()
  const editableCodesetCode = form?.watch('editableCodesetCode')

  if (
    !selectedAssigningAuthority ||
    !editableCodesetCode ||
    !selectedCodesetCodes ||
    !form
  )
    return

  const onSave = async () => {
    const isValid = await form.trigger('editableCodesetCode')

    if (
      !isValid &&
      form.formState.errors.editableCodesetCode?.displayName?.message
    ) {
      form.unregister('newCodesetCode')
      return toast.error(
        form.formState.errors.editableCodesetCode.displayName.message,
      )
    }

    if (row.original.displayName === editableCodesetCode.displayName) {
      form.reset({ ...form.getValues(), editableCodesetCode: undefined })
      return toast.success('saved')
    }

    setSaving(true)

    const response = await updateCodesetCode({
      assigningAuthorityId: selectedAssigningAuthority?.id,
      ...editableCodesetCode,
    })
    setSaving(false)

    if (response.state === 'error')
      return toast.error(response.error ?? 'Error while updating code')

    const updatedCodes = selectedCodesetCodes.map((code) =>
      code.id === editableCodesetCode.id
        ? { ...code, displayName: editableCodesetCode.displayName }
        : code,
    )

    form.reset({ ...form.getValues(), editableCodesetCode: undefined })

    await updateCurrentPageData(updatedCodes)

    toast.success('saved')
  }

  return <SaveButton onSave={onSave} disabled={saving} />
}

export { EditableRowActionSave }
