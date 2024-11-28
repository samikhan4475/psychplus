'use client'

import { Checkbox, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PropsWithRow } from '@/components'
import { SelectOptionType } from '@/types'

interface CodeSelectCellProps extends PropsWithRow<SelectOptionType> {
  field: string
  isDisabled?: boolean
}

const CodeSelectCell = ({ row, field, isDisabled }: CodeSelectCellProps) => {
  const form = useFormContext()
  const values = form.watch(field) as string[]

  const isSelected = (value: string) => {
    return values?.includes(value)
  }

  const toggleSelected = (value: string) => () => {
    const newValues = isSelected(value) ? [] : [value]
    form.setValue(field, [...newValues], { shouldValidate: true })
  }

  return (
    <Flex width="100%" justify="center">
      <Checkbox
        checked={isSelected(row.original.value)}
        onCheckedChange={toggleSelected(row.original.value)}
        highContrast
        disabled={isDisabled}
        className="data-[state=checked]:before:bg-pp-text-primary-base data-[state=checked]:data-[disabled]:before:bg-pp-gray-5 data-[disabled]:before:!bg-pp-gray-4"
      />
    </Flex>
  )
}

export { CodeSelectCell }
