import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@psychplus/ui/data-table'
import { TableCellDateTime, TableCellText } from '@psychplus/ui/table-cell'
import type { PatientPreferredPartner } from '../types'

const columns: ColumnDef<PatientPreferredPartner>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: () => <Text className="font-[400]">PP ID</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.id} />
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <Text className="font-[400]">PP name</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.name} />
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <Text className="font-[400]">PP Premium Status</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={row.original.subscriptionStatus}
      />
    ),
  },
  {
    id: 'payer-status',
    accessorKey: 'payerStatus',
    header: () => <Text className="font-[400]">PP Payer Status</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.payerStatus} />
    ),
  },
  {
    id: 'userId',
    accessorKey: 'userId',
    header: () => <Text className="font-[400]">PP User ID</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={`${row.original.userNumber}`}
      />
    ),
  },
  {
    id: 'userType',
    accessorKey: 'userType',
    header: () => <Text className="font-[400]">PP User Type</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.userType} />
    ),
  },
  {
    id: 'users-number',
    accessorKey: 'numberOfUsers',
    header: () => <Text className="font-[400]">Users in ID</Text>,
    cell: ({ row }) => (
      <TableCellText
        className="text-[12px]"
        text={`${row.original.totalIds}`}
      />
    ),
  },
  {
    id: 'userStatus',
    accessorKey: 'userStatus',
    header: () => <Text className="font-[400]">PP User Status</Text>,
    cell: ({ row }) => (
      <TableCellText className="text-[12px]" text={row.original.userStatus} />
    ),
  },
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header: () => <Text className="font-[400]">Start Date</Text>,
    cell: ({ row }) => <TableCellDateTime date={row.original.addDate} />,
  },
  {
    id: 'termDate',
    accessorKey: 'termDate',
    header: () => <Text className="font-[400]">Term Date</Text>,
    cell: ({ row }) => <TableCellDateTime date={row.original.termDate} />,
  },
]

interface PreferredPartnerTableProps {
  data: PatientPreferredPartner[]
}

const PreferredPartnerTable = ({ data }: PreferredPartnerTableProps) => {
  return (
    <Flex direction="column">
      <Heading className="bg-[#EEF2F6] pb-[2px] pl-2 pt-[4px] text-[14px]">
        Preferred Partner
      </Heading>
      <Box className="bg-[#FFFF] px-2 pb-5 pt-1">
        <DataTable
          tHeadClass="bg-[#F0F4FF]"
          thClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72] pl-1"
          tableClass="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          columnCellClass="[box-shadow:inset_0_0_0_0.1px_#0134DB72] pl-1"
          data={data}
          columns={columns}
        />
      </Box>
    </Flex>
  )
}

export { PreferredPartnerTable }
