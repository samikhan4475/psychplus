'use client'

import { useFormContext } from 'react-hook-form'
import { useStore } from '@/ui/assigning-authorities/store'
import { CancelButton } from '../../cancel-button'
import { SchemaType } from '../manage-attributes-form'

const RowActionCancel = () => {
  const { saving, selectedCode, setSelectedCode } = useStore()
  const form = useFormContext<SchemaType>()

  const onCancel = () => {
    if (selectedCode?.codeAttributes?.[0]?.id === 'new')
      setSelectedCode({
        ...selectedCode,
        codeAttributes: selectedCode?.codeAttributes?.slice(1) ?? [],
      })

    form.reset({ id: '' })
  }

  return <CancelButton onCancel={onCancel} disabled={saving} />
}

export { RowActionCancel }
