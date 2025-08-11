import { Flex, Table, Text } from '@radix-ui/themes'
import {
  QuestionnairesFormVadprsProps,
  QuestionnairesVadprsData,
} from '../types'
import { QuestionnairesFormVadprsDataTable } from './vadprs-data-table'

const QuestionnairesFormVadprs = ({
  labels,
  disabled,
  data,
  label,
  options,
}: QuestionnairesFormVadprsProps) => {
  return (
    <Flex direction="column" width="100%">
      <Table.Root variant="ghost" size="1" className="w-full">
        <Table.Header>
          <Table.Row className="bg-pp-focus-bg">
            <Table.ColumnHeaderCell
              width="37.5%"
              className="border-pp-table-border border-r"
            >
              <Text weight="medium" size="2">
                {labels?.[0]}
              </Text>
            </Table.ColumnHeaderCell>
            {labels?.slice(1).map((label) => (
              <Table.ColumnHeaderCell
                key={label}
                className="border-pp-table-border w-[9%] border-r text-center"
                pr="0"
              >
                <Text weight="medium" size="1">
                  {label}
                </Text>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
          {label && (
            <Table.Row>
              <Table.Cell
                colSpan={6}
                className="bg-pp-bg-table-cell h-fit py-1"
              >
                <Text weight="medium" size="1">
                  {label}
                </Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Header>
        <QuestionnairesFormVadprsDataTable
          data={data as QuestionnairesVadprsData[]}
          disabled={disabled}
          options={options}
        />
      </Table.Root>
    </Flex>
  )
}

export { QuestionnairesFormVadprs }
