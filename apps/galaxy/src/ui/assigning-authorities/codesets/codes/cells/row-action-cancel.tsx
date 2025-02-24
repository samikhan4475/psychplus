'use client'

import { useFormContext } from 'react-hook-form'
import { useStore } from '@/ui/assigning-authorities/store'
import { CodesetCodeAction } from '../../constants'
import { CancelButton } from '../buttons'
import { SchemaType } from '../code-schema'

const RowActionCancel = (action: CodesetCodeAction) => {
  const form = useFormContext<SchemaType>()
  const { saving } = useStore()

  const onCancel = () => {
    if (action === CodesetCodeAction.Edit)
      return form.reset({ ...form.getValues(), editableCodesetCode: undefined })
    if (action === CodesetCodeAction.New)
      return form.reset({ ...form.getValues(), newCodesetCode: undefined })
  }

  return <CancelButton onCancel={onCancel} disabled={saving} />
}

export { RowActionCancel }
