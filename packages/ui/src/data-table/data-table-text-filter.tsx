'use client'

import { type Column } from '@tanstack/react-table'
import { TextField } from '../text-field'

type TextFieldInputProps = React.ComponentProps<typeof TextField.Root>

interface DataTableTextFilterProps<TData> extends TextFieldInputProps {
  column?: Column<TData>
  placeholder?: string
}

const DataTableTextFilter = <TData,>({
  column,
  ...props
}: DataTableTextFilterProps<TData>) => {
  return (
    <TextField.Root
      value={(column?.getFilterValue() as string) ?? ''}
      onChange={(event: any) => column?.setFilterValue(event.target.value)}
      {...props}
    />
  )
}

export { DataTableTextFilter }
