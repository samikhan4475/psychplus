'use client'

import { IconButton } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { type PropsWithRow } from '@/components'
import { Edit2Icon } from '@/components/icons'
import { Code } from '@/ui/assigning-authorities/types'
import { SchemaType } from '../code-schema'

const RowActionEdit = ({ row }: PropsWithRow<Code>) => {
  const form = useFormContext<SchemaType>()

  const onEdit = () => {
    form.reset({ ...form.getValues(), editableCodesetCode: row.original })
    setTimeout(() => form.setFocus('editableCodesetCode.displayName'), 0)
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" onClick={onEdit}>
      <Edit2Icon
        width={16}
        height={16}
        className="cursor-pointer"
        fill="black"
      />
    </IconButton>
  )
}

export { RowActionEdit }
