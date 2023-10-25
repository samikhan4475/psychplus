'use client'

import { type Column } from '@tanstack/react-table'
import { TextField } from '@psychplus/ui/text-field'

type TextFieldInputProps = React.ComponentProps<typeof TextField.Input>

interface DataTableTextFilterProps<TData> extends TextFieldInputProps {
  column?: Column<TData>
}

const DataTableTextFilter = <TData,>({
  column,
  ...props
}: DataTableTextFilterProps<TData>) => (
  <TextField.Input
    value={(column?.getFilterValue() as string) ?? ''}
    onChange={(event) => column?.setFilterValue(event.target.value)}
    {...props}
  />
)

export { DataTableTextFilter, type DataTableTextFilterProps }
