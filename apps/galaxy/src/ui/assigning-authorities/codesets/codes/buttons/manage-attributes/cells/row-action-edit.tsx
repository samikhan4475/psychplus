'use client'

import { IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { Edit2Icon } from '@/components/icons'
import { useStore } from '@/ui/assigning-authorities/store'
import { CodeAttribute } from '@/ui/assigning-authorities/types'
import { SchemaType } from '../manage-attributes-form'

interface ViewActionEditProps {
  row: Row<CodeAttribute>
}

const RowActionEdit = ({ row }: ViewActionEditProps) => {
  const { selectedCode, setSelectedCode } = useStore()
  const form = useFormContext<SchemaType>()
  if (!selectedCode) return

  const onEdit = () => {
    if (selectedCode?.codeAttributes?.[0]?.id === 'new')
      setSelectedCode({
        ...selectedCode,
        codeAttributes: selectedCode?.codeAttributes?.slice(1) ?? [],
      })

    form.reset({ ...row.original })
    setTimeout(() => form.setFocus('value'), 0)
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
