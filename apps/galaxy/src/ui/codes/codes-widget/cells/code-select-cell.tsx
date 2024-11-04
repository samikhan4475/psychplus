'use client'

import { Checkbox, Flex } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { SelectOptionType } from '@/types'

type CodesRow = Row<SelectOptionType>
interface RowProps {
  row: CodesRow
  field: string
}

const CodeSelectCell = ({ row, field }: RowProps) => {
  const form = useFormContext()
  const values = form.watch(field) as string[]

  const isSelected = (value: string) => {
    return values.includes(value)
  }

  const toggleSelected = (value: string) => () => {
    const newValues = isSelected(value) ? [] : [value]
    form.setValue(field, newValues)
  }
  const isDisabled = field !== 'primaryCode'

  return (
    <Flex width="100%" justify="center">
      <Checkbox
        checked={isSelected(row.original.value)}
        onCheckedChange={toggleSelected(row.original.value)}
        highContrast
        disabled={isDisabled}
        className="data-[state=checked]:before:bg-pp-text-primary-base 
       data-[state=checked]:data-[disabled]:before:bg-pp-gray-5 data-[disabled]:before:bg-pp-gray-5
       "
      />
    </Flex>
  )
}

export { CodeSelectCell }
