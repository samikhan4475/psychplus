import { Flex, Table } from '@radix-ui/themes'
import { BlockLabel, FormFieldError } from '@/components'

const ColumnHeader = ({
  title,
  rightComponent,
  field,
}: {
  title: string
  rightComponent: JSX.Element
  field: string
}) => {
  return (
    <Table.Row>
      <Table.ColumnHeaderCell className="border-pp-table-border bg-pp-focus-bg-2 sticky left-0 z-10 h-6 border px-1 py-0">
        <Flex direction="row" justify="between" align="center">
          <Flex direction="row" gap="1" align="center">
            <BlockLabel className="text-1 font-medium" required>
              {title}
            </BlockLabel>
            <FormFieldError name={field} />
          </Flex>
          {rightComponent}
        </Flex>
      </Table.ColumnHeaderCell>
    </Table.Row>
  )
}

export { ColumnHeader }
