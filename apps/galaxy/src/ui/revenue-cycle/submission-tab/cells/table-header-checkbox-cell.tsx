import { Box, Checkbox } from '@radix-ui/themes'
import { useStore } from '../store'

interface HeaderCheckboxProps {
  checked: boolean
  onCheckedChange: (value: boolean) => void
}
const TableHeaderCheckboxCell = ({
  checked,
  onCheckedChange,
}: HeaderCheckboxProps) => {
  const { setSelectedRows, claims } = useStore((state) => ({
    setSelectedRows: state.setSelectedRows,
    claims: state.data?.submissions,
  }))
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Checkbox
        checked={checked}
        className="ml-[4.5px] mt-0.5"
        color="indigo"
        highContrast
        onCheckedChange={(value) => {
          onCheckedChange(!!value)
          setSelectedRows(value ? claims?.map((claim) => claim.id) || [] : [])
        }}
        aria-label="Select all"
      />
    </Box>
  )
}
export { TableHeaderCheckboxCell }
