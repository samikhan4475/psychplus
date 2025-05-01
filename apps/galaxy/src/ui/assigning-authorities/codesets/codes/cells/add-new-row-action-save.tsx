'use client'

import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { addCodesetCode } from '@/ui/assigning-authorities/actions'
import { useStore } from '@/ui/assigning-authorities/store'
import { SaveButton } from '../buttons'
import { SchemaType } from '../code-schema'

const AddNewRowActionSave = () => {
  const {
    selectedAssigningAuthority,
    saving,
    setSaving,
    selectedCodesetCodes,
    updateCurrentPageData,
  } = useStore()
  const form = useFormContext<SchemaType>()
  const newCodesetCode = form?.watch('newCodesetCode')

  if (!selectedAssigningAuthority || !newCodesetCode || !form) return

  const onSave = async () => {
    const isValid = await form.trigger('newCodesetCode')

    if (!isValid) {
      form.unregister('editableCodesetCode')
      if (form.formState.errors.newCodesetCode?.code?.message)
        return toast.error(form.formState.errors.newCodesetCode.code.message)

      if (form.formState.errors.newCodesetCode?.displayName?.message)
        return toast.error(
          form.formState.errors.newCodesetCode.displayName.message,
        )
    }

    setSaving(true)

    const response = await addCodesetCode({
      assigningAuthorityId: selectedAssigningAuthority?.id,
      ...newCodesetCode,
    })

    if (response.state === 'error') {
      setSaving(false)
      return toast.error(
        parseSqlError(response.error) ?? 'Error while saving new code',
      )
    }

    form.reset({ ...form.getValues(), newCodesetCode: undefined })
    setSaving(false)

    await updateCurrentPageData([
      response.data,
      ...(selectedCodesetCodes ?? []),
    ])

    toast.success('saved')
  }

  return <SaveButton onSave={onSave} disabled={saving} />
}

const parseSqlError = (errorMsg?: string) => {
  const match = /The duplicate key value is \((.+)\)/.exec(errorMsg ?? '')
  return match ? 'A record with this Code value already exists.' : errorMsg
}

export { AddNewRowActionSave }
