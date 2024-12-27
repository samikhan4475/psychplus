import { Flex, IconButton, Table, Text } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'

const TableRow = ({
  title,
  onDelete,
  disabled = false,
}: {
  title: string
  onDelete: () => void
  disabled?: boolean
}) => {
  return (
    <Table.Cell className="border-pp-table-border bg-white min-w-36 sticky left-0 z-10 h-7 max-w-[50px] flex-row border border-t-0 px-1 py-0 align-middle">
      <Flex direction="row" align="center" justify="between">
        <Text className="text-1 font-regular">{title}</Text>
        <IconButton
          className="h-4 w-4"
          variant="ghost"
          type="button"
          onClick={onDelete}
          disabled={disabled}
        >
          <Trash2 color="#60646C" />
        </IconButton>
      </Flex>
    </Table.Cell>
  )
}

export { TableRow }
