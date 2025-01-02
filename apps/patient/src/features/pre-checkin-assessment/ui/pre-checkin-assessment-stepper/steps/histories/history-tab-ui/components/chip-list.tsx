'use client'

import { useFormContext } from 'react-hook-form'
import { DeletableChip } from './deletable-chip'

interface ChipListProps {
  data?: string[]
  options: Array<{
    label: string
    value: string
    disabled?: boolean
  }>
  chipClassName?: string
  className?: string
  field: string
}
const ChipList = ({ data, options, chipClassName, field }: ChipListProps) => {
  const { setValue, getValues } = useFormContext()

  const handleDelete = (index: number) => {
    const updatedArray = getValues(field).filter(
      (_: string, idx: number) => idx !== index,
    )
    setValue(field, updatedArray)
  }
  if (!data?.length) return
  return data.map((item, idx) => {
    const optionLabel =
      options.find((option) => option.value === item)?.label ?? item
    return (
      <DeletableChip
        key={`${item}-${idx}`}
        content={optionLabel}
        className={chipClassName}
        onDelete={() => handleDelete(idx)}
      />
    )
  })
}

export { ChipList }
