import { DataTableColumnHeader } from "@psychplus/ui/data-table/data-table-column-header"
import { TableCellDateTime, TableCellText } from "@psychplus/ui/table-cell"
import { ColumnDef } from "@tanstack/react-table"
import { TableData } from "../../types"
import { Text } from "@radix-ui/themes"
import { DataTable } from "@psychplus/ui/data-table/data-table"

const data = [
    {
        id: 0,
        date: '12/07/2024',
        name: 'Robert Smith',
        age: 32,
        gender: 'Male',
        dob: '03/21/96',
        ptStatus: 'Active',
        p: '?',
        i: 'verified',
        c: '?',
        cc: 'unverified',
        state: 'Texas',
        Location: 'Houston',
        providerType: 'psychiatry',
        provider: 'Faisal Tai MD',
        primaryInsurance: 'Americal Family',
        secondaryInsurance: 'Allstate',
        visit: {
            type: 'Outpatient office',
            sequence: 'New',
            medium: 'In-person',
            status: 'scheduled',
            date: '03/09/24 0:00',
            insVerification: 'View',
        },
        coPay: {
            due: '$12',
            paid: '$12',
        },
        coIns: {
            due: '$12',
            paid: '$12'
        },
        balance: {
            due: '$12',
            paid: '$12',
        },
        nodeSigned: true,
    }
]

const columns: ColumnDef<TableData>[] = [
    {
        id: 'date-time',
        accessorKey: 'date',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Date & Time' />,
        cell: ({ row }) => <TableCellDateTime  date={row.original.date} />,
    }, 
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
        cell: ({ row }) => <TableCellText text={row.original.name} />,
    }, 
    {
        id: 'age',
        accessorKey: 'age',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Age' />,
        cell: ({ row }) => <TableCellText text={`${row.original.age}`} />,
    }, 
    {
        id: 'gender',
        accessorKey: 'gender',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Gender' />,
        cell: ({ row }) => <TableCellText text={row.original.gender} />,
    }, 
    {
        id: 'dob',
        accessorKey: 'dob',
        header: ({ column }) => <DataTableColumnHeader column={column} title='DOB' />,
        cell: ({ row }) => <TableCellDateTime  date={row.original.dob} />,
    }, 
    {
        id: 'patient-status',
        accessorKey: 'ptStatus',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Pt Status' />,
        cell: ({ row }) => <TableCellText text={row.original.ptStatus} />,
    }, 
    {
        id: 'verify',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Verify' />,
        columns: [
            {
                id: 'verify-p',
                header: () => <Text>P</Text>,
                cell: ({ row }) => <TableCellText text={row.original.p} />,
            },
            {
                id: 'verify-i',
                header: () => <Text>I</Text>,
                cell: ({ row }) => <TableCellText text={row.original.i} />,
            },
            {
                id: 'verify-c',
                header: () => <Text>C</Text>,
                cell: ({ row }) => <TableCellText text={row.original.c} />,
            },
            {
                id: 'verify-cc',
                header: () => <Text>CC</Text>,
                cell: ({ row }) => <TableCellText text={row.original.cc} />,
            },
            
        ]
    }, 
]

const ListViewTable = () => {
    return (
        <DataTable
          tHeadClass="bg-[#F0F4FF]"
          thClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72] pl-1"
          tableClass="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          columnCellClass="[box-shadow:inset_0_0_0_0.1px_#0134DB72] pl-1"
          data={data}
          columns={columns}
        />
    )
}

export { ListViewTable }