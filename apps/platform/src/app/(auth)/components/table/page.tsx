'use client'

import { Box, Heading } from '@radix-ui/themes'
import { Table } from '@psychplus/ui/table'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Table'
const DESCRIPTION = 'A semantic table for presenting tabular data.'

const TableComponentPage = () => (
  <Box className="min-w-[600px]">
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <Box mb="7">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Benmor Stoutback</Table.RowHeaderCell>
            <Table.Cell>benmorstoutback@gmail.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Vonrus Broadbreaker</Table.RowHeaderCell>
            <Table.Cell>vonrusbroadbreaker@gmail.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Grantharn Frostsong</Table.RowHeaderCell>
            <Table.Cell>grantharnfrostsong@gmail.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>

    <Box mb="7">
      <Box mb="3">
        <Heading size="5">With a backplate</Heading>
      </Box>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Group</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>Theldain Boldbrow</Table.RowHeaderCell>
            <Table.Cell>theldainboldbrow@gmail.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Haendar Heartfury</Table.RowHeaderCell>
            <Table.Cell>haendarheartfury@gmail.com</Table.Cell>
            <Table.Cell>Admin</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.RowHeaderCell>Skaff Stormblood</Table.RowHeaderCell>
            <Table.Cell>skaffstormblood@gmail.com</Table.Cell>
            <Table.Cell>Developer</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  </Box>
)

export default TableComponentPage
