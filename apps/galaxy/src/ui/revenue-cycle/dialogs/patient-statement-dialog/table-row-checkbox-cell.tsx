import { Box, Checkbox } from '@radix-ui/themes'
import { type Row } from '@tanstack/react-table'
import { PatientStatement } from '../../types'
import { useStore } from './store'

interface TableRowCheckboxCellProps {
  row: Row<PatientStatement>
}

const TableRowCheckboxCell = ({ row }: TableRowCheckboxCellProps) => {
  const { selectedStatements, setSelectedStatements } = useStore((state) => ({
    selectedStatements: state.selectedStatements,
    setSelectedStatements: state.setSelectedStatements,
  }))
  const toggleSelected = async (value: boolean) => {
    row.toggleSelected(value)
    const selectedIds = value
      ? [...selectedStatements, row.original.id]
      : selectedStatements.filter((id) => id !== row.original.id)
    setSelectedStatements(selectedIds)
  }
  return (
    <Box className="pl-[2px]">
      <Checkbox
        checked={row.getIsSelected()}
        className="mt-0.5"
        onCheckedChange={(value) => toggleSelected(!!value)}
        color="indigo"
        highContrast
      />
    </Box>
  )
}
export { TableRowCheckboxCell }
