import { Box, Checkbox } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { ProviderSchemaType } from '../schema'

interface RowCheckboxProps {
  id: number
  checked: boolean
  onCheckedChange: (val: boolean) => void
}

const TableRowCheckboxCell = ({
  id,
  checked,
  onCheckedChange,
}: RowCheckboxProps) => {
  const form = useFormContext<ProviderSchemaType>()
  const selectedRows = form.watch('selectedRows')

  const handleCheckboxChange = (value: boolean | 'indeterminate'): void => {
    onCheckedChange(!!value)
    const selectedIds = value
      ? [...selectedRows, `${id}`]
      : selectedRows.filter((selectedId: string) => selectedId !== `${id}`)
    form.setValue('selectedRows', [...selectedIds])
  }

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="mt-0.5"
        onCheckedChange={handleCheckboxChange}
        color="indigo"
        highContrast
      />
    </Box>
  )
}

export { TableRowCheckboxCell }
