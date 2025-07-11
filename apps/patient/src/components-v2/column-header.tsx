import { Table } from '@radix-ui/themes'

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="h-auto py-2 font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

export { ColumnHeader }
